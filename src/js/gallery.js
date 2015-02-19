/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

var gallery = {
    gal: '',
    album: document.createElement('h1'),
    albumCont: document.createElement('div'),
    prev: document.createElement('div'),
    prevCont: document.createElement('div'),
    next: document.createElement('div'),
    nextCont: document.createElement('div'),
    imgs: document.createElement('ul'),
    cont: document.createElement('li'),
    img: document.createElement('img'),
    descs: document.createElement('ul'),
    tmbsCont: document.createElement('div'),
    tmbs: document.createElement('ul'),
    title: document.createElement('h2'),
    bgImg: document.createElement('div'),
    init: function(obj, options, descTitle) {
        this.gal = document.getElementById(obj);
        this.gal.style.display = "none";
        this.gal.className = 'gallery';
        this.albumCont.className = 'gallery-album';
        this.album.className = 'gallery-album-name';
        this.prev.className = 'gallery-prev';
        this.next.className = 'gallery-next';
        this.imgs.className = 'gallery-imgs gallery-list';
        this.tmbs.className = 'gallery-tmbs gallery-list';
        this.title.className = 'gallery-title';
        this.descs.className = 'gallery-descs gallery-list';
        this.tmbsCont.className = 'gallery-tmbsCont';
        this.prevCont.className = 'gallery-prevCont';
        this.nextCont.className = 'gallery-nextCont';
        this.bgImg.className = 'gallery-bgImg';
        this.setTitle(options.album.name);
        var photos = options.photos;
        for (var photo in photos) {
            this.setImgs(photos[photo].image);
            this.setDescription(photos[photo].title, photos[photo].location, photos[photo].date, descTitle);
            this.setThumbnails(photos[photo].thumb_url);
        }
        
        this.albumCont.appendChild(this.album);
        this.prevCont.appendChild(this.prev);
        this.nextCont.appendChild(this.next);
        this.gal.appendChild(this.albumCont);
        this.gal.appendChild(this.bgImg);
        this.gal.appendChild(this.prevCont);
        this.gal.appendChild(this.imgs);
        this.gal.appendChild(this.nextCont);
        this.gal.appendChild(this.descs);
        this.tmbsCont.appendChild(this.tmbs);
        this.gal.appendChild(this.tmbsCont);
        this.tmbs.children[0].className = 'gallery-tmb gallery-tmb-active';
        this.imgs.children[0].style.display = 'block';
        this.descs.children[0].style.display = 'block';
        this.activeSlide();
        this.setPrevEvent();
        this.setNextEvent();
        this.gal.style.display = "block";
    },
    setTitle: function(title) {
        var text = document.createTextNode(title);
        this.album.appendChild(text);
    },
    setImgs: function(img) {
        var cloneList = this.cont.cloneNode(true);
        var cloneImg = this.img.cloneNode(true);
        cloneImg.src = img;
        cloneImg.className = 'gallery-img';
        cloneList.className = 'gallery-imgCont';
        cloneList.appendChild(cloneImg);
        this.imgs.appendChild(cloneList);
    },
    setDescription: function(title, location, date, descTitle) {
        var titleCont = this.title.cloneNode(true);
        var text = document.createTextNode(title);
        var clone = this.cont.cloneNode(true);
        titleCont.appendChild(text);
        var desc = descTitle;
        desc += location;
        desc += ' on ';
        desc += date;
        var textNode = document.createTextNode(desc);
        clone.className = 'gallery-desc';
        clone.appendChild(titleCont);
        clone.appendChild(textNode);
        this.descs.appendChild(clone);

    },
    setThumbnails: function(img) {
        var cloneList = this.cont.cloneNode(true);
        var cloneImg = this.img.cloneNode(true);
        cloneImg.src = img;
        cloneList.className = 'gallery-tmb';
        cloneList.appendChild(cloneImg);
        this.tmbs.appendChild(cloneList);
    },
    activeSlide: function() {
        var that = this;
        //this.tmbs.addEventListener('click', function(e) {
        var galleryTmbs = document.getElementsByClassName('gallery-tmb');
        for (var galleryTmb in galleryTmbs) {
            if (typeof galleryTmbs[galleryTmb] == 'object') {
                console.log(galleryTmbs[galleryTmb]);
                galleryTmbs[galleryTmb].addEventListener('click', function(e) {
                    var listItems = that.tmbs.children;                    
                    var selected = 0;
                    console.log(e.srcElement);
                    for (var listItem in listItems) {
                        if (typeof listItems[listItem] == 'object') {
                            listItems[listItem].className = 'gallery-tmb';
                            if (listItems[listItem].children[0] == this.children[0]) {
                                listItems[listItem].className = 'gallery-tmb gallery-tmb-active';
                                selected = listItem;
                            }
                        }
                    }
                    for (var img in that.imgs.children) {
                        if (typeof that.imgs.children[img] == 'object') {
                            that.imgs.children[img].style.display = 'none';
                        }
                    }
                    for (var desc in that.descs.children) {
                        if (typeof that.descs.children[desc] == 'object') {
                            that.descs.children[desc].style.display = 'none';
                        }
                    }
                    that.imgs.children[selected].style.display = 'block';
                    that.descs.children[selected].style.display = 'block';
                    
                });
            }
        }
    },
    setPrevEvent: function() {
        this.prevCont.addEventListener('click', function(e) {
            var galleryActive = document.getElementsByClassName('gallery-tmb-active')[0];
            if (galleryActive.previousSibling !== null) {
                galleryActive.previousSibling.children[0].click();
            }
        });
    },
    setNextEvent: function() {
        this.nextCont.addEventListener('click', function(e) {
            var galleryActive = document.getElementsByClassName('gallery-tmb-active')[0];
            if (galleryActive.nextSibling !== null) {
                galleryActive.nextSibling.children[0].click();
            }
        });
    }
};
