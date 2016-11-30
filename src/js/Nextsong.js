function NextSong() {
    SongPlayer++;
    if (SongPlayer == SongPath.length + 1)
        SongPlayer = 1;
    document.getElementById("player").src = SongPath[SongPlayer - 1];
    document.getElementById("songtext").textContent = SongText[SongPlayer - 1];
    document.getElementById("songpic").src = SongPic[SongPlayer - 1];
}