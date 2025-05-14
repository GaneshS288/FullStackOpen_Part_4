function dummy(blogs) {
    return 1;
}

function totalLikes(blogs) {
    if(blogs.length === 0) {
        return 0;
    }

    const total = blogs.reduce((accu, next) => accu + next.likes, 0);

    return total;
}

function favoriteBlog(blogs) {
    if(blogs.length === 0) 
        return null;

    //descending sort
    const sortedBlogs = blogs.toSorted((a, b) => b.likes - a.likes);

    return sortedBlogs[0];
}

export { dummy, totalLikes, favoriteBlog };
