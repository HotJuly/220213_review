export default {
    data() {
        return {
            x:0,
            y:0,
            c:2
        }
    },
    mounted(){
        document.addEventListener('mousemove',(event)=>{
            // console.log('mousemove',event)
            this.x = event.pageX;
            this.y = event.pageY;
        })
    }
}