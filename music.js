class Music{
    constructor(title,singer, img, file){
        this.title = title;
        this.singer = singer;
        this.img = img;
        this.file = file;
    }


    getName(){
        return this.title + " - " + this.singer
    }
}


const musicList = [
    new Music("İmdat","Çakal", "1.png","1.mp3" ),
    new Music("Tutsak","Sefo", "2.jpeg","2.mp3" ),
    new Music("Es Deli Deli","Burak & Kurtuluş ", "3.jpeg","3.mp3" )
]