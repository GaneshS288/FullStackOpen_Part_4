function dummy(blogs) {
    return 1;
}

function totalLikes(blogs) {
    if (blogs.length === 0) {
        return 0;
    }

    const total = blogs.reduce((accu, curr) => accu + curr.likes, 0);

    return total;
}

function favoriteBlog(blogs) {
    if (blogs.length === 0) return null;

    //descending sort
    const sortedBlogs = blogs.toSorted((a, b) => b.likes - a.likes);

    return sortedBlogs[0];
}

function mostBlogs(blogs) {
    if (blogs.length === 0) return null;

    const authorsWithBlogCount = blogs.reduce((accu, curr) => {
        const authorAlreadyInAccu = accu.find((author) => {
            return author.author === curr.author;
        });

        if (authorAlreadyInAccu) authorAlreadyInAccu.blogs += 1;
        else if (!authorAlreadyInAccu)
            accu.push({ author: curr.author, blogs: 1 });

        return accu;
    }, []);

    //sort authors in descending order
    const sortedAuthors = authorsWithBlogCount.sort(
        (a, b) => b.blogs - a.blogs
    );

    return sortedAuthors[0];
}

function mostLikes(blogs) {
    if (blogs.length === 0) return null;

    const authorsWithLikeCount = blogs.reduce((accu, curr) => {
        const authorAlreadyInAccu = accu.find((author) => {
            return author.author === curr.author;
        });

        if (authorAlreadyInAccu) authorAlreadyInAccu.likes += curr.likes;
        else if (!authorAlreadyInAccu)
            accu.push({ author: curr.author, likes: curr.likes });

        return accu;
    }, []);

    //sort authors in descending order
    const sortedAuthors = authorsWithLikeCount.sort(
        (a, b) => b.likes - a.likes
    );

    return sortedAuthors[0];
}

export { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes };
