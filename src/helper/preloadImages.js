export const prelaodImages = (data, cb) => {
  let images = []
  data.forEach((item) => {
    let img = new Image()
    img.src = item.images
    img.onload = () => {
      images.push(img)
      console.log(images)
      if (images.length === data.length) {
        console.log("se cargaron")
        cb()
      }
    }
  })
}
