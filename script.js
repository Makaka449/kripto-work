function showMore(islandId) {
    const island = document.getElementById(islandId);
    const moreText = document.createElement('p');
    moreText.textContent = 'Дополнительная информация о ' + island.querySelector('h2').textContent + '.';
    island.querySelector('.content').appendChild(moreText);
}
