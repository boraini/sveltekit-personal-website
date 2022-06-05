import fsSync from "node:fs";
import path from "node:path/posix";
import { process } from "./markdown-processor";

class DirectoryIndex {
    //name of the directory i. e. what the homepage URL ends with
    path: string;
    //processed contents of the main markdown file. See markdown-processor.js
    content: object;
    //any subblogs found in the directory
    subblogs: Array<DirectoryIndex>;
    //any pages other than the main file found in the directory
    pages: Array<DirectoryIndex>;
    constructor({ path, subblogs, pages, content }) {
        this.path = path;
        this.content = content;
        this.subblogs = subblogs;
        this.pages = pages;
    }
}

class Blog {
    rootPath: string;

    constructor(options: { rootPath: string; }) {
        this.rootPath = options.rootPath;
    }

    jsonGet(params: { slug: string;}) {
        // we could get the dynamic slug from the parameter of get.
        const { slug } = params;

        console.log("slug: " + slug);

        let result;

        if (slug == "index") {
            result = this.indexArticles("", { shallow: true })
        } else {
            result = this.indexArticles(slug, { shallow: true });
        }
        return { body: JSON.stringify(result) };
    }

    indexArticles(indexPath: string, options: {
        _floor?: number;
        shallow: boolean;
    }) {
        const result = indexArticlesInDir(this.rootPath, indexPath, {...options, _floor: 2});
        
        console.dir(result);

        return result;
    }
}

function indexArticlesInDir(root: string, indexPath : string, options: {
    _floor: number;
    shallow: boolean;
}): DirectoryIndex {
    //these will be assigned to the returned DirectoryIndex
    let contentFile;
    const pages: Array<DirectoryIndex> = [];
    const subblogs: Array<DirectoryIndex> = [];
    const isAtFloor = options._floor <= 0;

    //decrement the altitude from the floor of filesystem recursion
    if (options.shallow) options._floor--;

    for (const dirent of fsSync.readdirSync(path.join(root, indexPath), { withFileTypes: true })) {
        if (!isAtFloor && dirent.isDirectory()) {
            const subPath = path.join(indexPath, dirent.name);
            const subIndex = indexArticlesInDir(root, subPath, options);

            //check if any other pages in the directory are found to differentiate between page folders and subblog folders
            if (subIndex.pages.length != 0)
                subblogs.push(subIndex);
            else
                pages.push(subIndex);
        }

        if (dirent.isFile()) {
            if (path.extname(dirent.name) == ".md") {
                const page = new DirectoryIndex({
                    path: indexPath,
                    content: process(path.join(root, indexPath, dirent.name)),
                    //content: "null content",
                    subblogs: [],
                    pages: []
                });
                if (dirent.name == path.basename(path.join(root, indexPath)) + ".md") {
                    contentFile = page;
                }
                else {
                    pages.push(page);
                }
            }
        }
    }
    return new DirectoryIndex({
        path: indexPath,
        content: contentFile?.content,
        pages, subblogs
    });
}

export { Blog };
export type { DirectoryIndex };