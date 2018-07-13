var Letter = function(letter){
    this.letter = letter
    this.shown = false

    this.displayLetter = function(){
        if(this.shown){
            return this.letter;

        }else{
            return "_";
        }
    }

}

module.exports = Letter