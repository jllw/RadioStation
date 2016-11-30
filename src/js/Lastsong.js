function LastSong() {
    SongPlayer--;
    if (SongPlayer === 0)
        SongPlayer = SongPath.length;
    document.getElementById("player").src = SongPath[SongPlayer - 1];
    document.getElementById("songtext").textContent = SongText[SongPlayer - 1];
    document.getElementById("songpic").src = SongPic[SongPlayer - 1];
}