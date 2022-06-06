import * as vfile from 'to-vfile';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkStringify from 'remark-stringify';
import remark2rehype from 'remark-rehype';
import remarkFrontmatter from 'remark-frontmatter';
import remarkParseYaml from 'remark-parse-yaml';
import remarkGfm from 'remark-gfm';
import stringify from 'rehype-stringify';

//console.log("MADDOCK WAS HERE: ", unified)

const datastore = {};

function extractFrontmatter(datastore) {
    return () => tree => {
        const filteredElements = tree.children.filter(x => ['yaml'].indexOf(x.type) != -1);
        if (filteredElements.length == 0) {
            console.log("no frontmatter found");
            datastore.frontmatter = null;
            return tree;
        }
        /*
        return Object.assign({}, tree, {
            data: Object.assign({}, tree.data, {frontmatter: filteredElements[0].data.parsedValue})
        });*/
        console.dir(filteredElements);
        datastore.frontmatter = filteredElements[0].data.parsedValue;
        return tree;
    };
}

function injectFrontmatter(datastore) {
    return () => tree => {
        tree.data = tree.data || {};
        if (datastore.frontmatter) tree.data.frontmatter = datastore.frontmatter;
    }
}

function printTree() {
    return () => tree => {
        console.dir(tree);
        return tree;
    };
}

const processor = unified()
    .use(remarkParse)    // parse into markdown syntax tree
    .use(remarkGfm)
    .use(remarkFrontmatter, {
        type: "yaml",
        fence: { open: "---", close: "---" }
    })
    .use(remarkParseYaml)
    //.use(printTree())
    .use(extractFrontmatter(datastore))
    .use(remarkGfm)
    .use(remark2rehype)
    //.use(filterElements(x => ["yaml"].indexOf(x.type) == -1))
    //
    //  // convert to html syntax tree
    .use(stringify)      // turn html syntax tree to html
    .use(printTree())

const frontmatterProcessor = unified()
    .use(remarkParse)    // parse into markdown syntax tree
    .use(remarkStringify)


// process function will return the generated html string.
export function process(filename) {
    // use vfile to read the file, could use fs if you like.
    const result = processor.processSync(vfile.readSync(filename));
    //const frontmatter = frontmatterProcessor.processSync(vfile.readSync(filename));
    result.frontmatter = datastore.frontmatter;

    return result;
}

/*export function processMetadata(filename) {
    return metadataProcessor.processSync(vfile.readSync(filename));
}*/