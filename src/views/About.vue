<template>
  <div class="back-color" style="padding-top: 3.5rem;">
    <div class="container mt-5">
        <div class="row">
          <div class="col">
            <p class="fst-italic" style="fontSize: 1.8rem"> 
              Welcome to this ConnectIn page. If you are facing some problem and
              looking for a solution from an experienced person then you are in
              the right place. Here you can get solutions for your problem from
              your school mates or friends who are studying in the same
              university. Don’t be afraid of outsider people, this platform is
              for only EUAS students. Have some problems, create a group and
              post.
            </p>
          </div >
        </div>
        <div class="row d-flex justify-content-center mt-5">
           <img :src="chosenImg" class="img-fluid" >
        </div>
        

    </div>
  </div>
</template>

<script>
import image from '../assets/writting.jpeg'
import image2 from '../assets/drawing.jpeg'
import image3 from '../assets/dancing.jpeg'
export default {
  data(){
    return{
      images:[
        image,
        image2,
        image3

      ],
      chosenImg: null
    }
  },
  methods:{
     randomItem (items) {
      return items[Math.floor(Math.random()*items.length)];
    }

  },
  created() {
    this.chosenImg = this.randomItem(this.images)
  }

}
</script>


<style scoped>
img{
  max-width: 500px;
}
p{
  text-align: justify;
}
.back-color{
  background-color: rgb(205, 222, 241);
  min-height: 100vh;

}

</style>
