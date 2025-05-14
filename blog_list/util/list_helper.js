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

export { dummy, totalLikes };
