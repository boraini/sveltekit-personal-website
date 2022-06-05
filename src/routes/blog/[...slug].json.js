import blog from "$lib/blog-of-articles";
import { process } from "$lib/markdown-processor.js";

export function get({ params }) {
    return blog.jsonGet(params);
}