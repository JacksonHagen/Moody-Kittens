let kittens = []
let currentKitten = {}
let form
/**
 * Called when submitting the new Kitten Form
 * This method will pull data from the form
 * use the provided function to give the data an id
 * then add that data to the kittens list.
 * Then reset the form
 */
loadKittens()


function addKitten(event) {
  event.preventDefault()
  form = event.target

  if(kittens.find(kitten => kitten.name == form.name.value))
    alert("A kitten already has this name")
  else if(form.name.value=="")
    alert("The kitten must have a name")
  else{
    let kitten = {
      id: generateId(),
      name: form.name.value,
      mood: "tolerant",
      affection: 5,
    }
    kittens.push(kitten)
  }

  saveKittens()

  form.reset()
  drawKittens()
  //let kittenName = form.Kitten.name
  //Kitten = {{name: string, mood: string, affection: number}} Kitten
}

/**
 * Converts the kittens array to a JSON string then
 * Saves the string to localstorage at the key kittens 
 */
function saveKittens() {
  window.localStorage.setItem("kittens", JSON.stringify(kittens))
  drawKittens()
}

/**
 * Attempts to retrieve the kittens string from localstorage
 * then parses the JSON string into an array. Finally sets
 * the kittens array to the retrieved array
 */
function loadKittens() {
  let kittensData = JSON.parse(window.localStorage.getItem("kittens"))
  if(kittensData) {
    kittens = kittensData
  }
}

/**
 * Draw all of the kittens to the kittens element
 */
function drawKittens() {
  let kittenListElem = document.getElementById("kittens")
  let kittenCard = ""
kittens.forEach(kitten => {
    kittenCard +=`
      <div class="m-3 bg-dark text-light kitten ${kitten.mood}">
      <img src="https://robohash.org/${kitten.name}?size=200x200&set=set4">
      <div class="d-flex justify-content-center">Name: ${kitten.name}</div>
      <div class="d-flex justify-content-center">Mood: ${kitten.mood}</div>
      <div class="d-flex justify-content-center">Affection: ${kitten.affection}</div>
      <button class="m-2" onclick="catnip('${kitten.id}')">Feed Catnip</button>
      <button onclick="pet('${kitten.id}')" class="m-2">Pet Kitten</button>
      <div class="justify-content-center d-flex">
        <button class="m-2">
          <i class="text-danger fa fa-trash action" style="font-size:24px; color:black; pointer-events:all" onclick="deleteKitten('${kitten.id}')"></i>
        </button>
      </div>
    </div>
      `
  })
  kittenListElem.innerHTML = kittenCard
  
}
/** @param {string} id */  
function deleteKitten(id) {
  let index = kittens.findIndex(kitten => kitten.id == id)
  
  kittens.splice(index, 1)
  saveKittens()
}
/**
 * Find the kitten in the array by its id
 * @param {string} id 
 * @return {Kitten}
 */
function findKittenById(id) {
  return kittens.find(kitten => kitten.id == id)
}


/**
 * Find the kitten in the array of kittens
 * Generate a random Number
 * if the number is greater than .5 
 * increase the kittens affection
 * otherwise decrease the affection
 * @param {string} id 
 */
function pet(id) {
  
  let rand = Math.random()
  let kittenToPet = findKittenById(id)
    
  if(rand > 0.5)
    kittenToPet.affection++
  else
    kittenToPet.affection--

  setKittenMood(kittenToPet)
  saveKittens()
}

/**
 * Find the kitten in the array of kittens
 * Set the kitten's mood to tolerant
 * Set the kitten's affection to 5
 * @param {string} id
 */
function catnip(id) {
  let kittenToFeed = findKittenById(id)
  kittenToFeed.affection = 5
  setKittenMood(kittenToFeed)
  saveKittens()
}

/**
 * Sets the kittens mood based on its affection
 * @param {Kitten} kitten 
 */
function setKittenMood(kitten) {
  if(kitten.affection<=0)
    kitten.mood = "gone"
  else if(kitten.affection<4)
    kitten.mood = "angry"
  else if(kitten.affection>6)
    kitten.mood = "happy"
  else
    kitten.mood = "tolerant"
}

/**
 * Removes all of the kittens from the array
 * remember to save this change
 */
function clearKittens(){
  kittens = []
  saveKittens()
}

/**
 * Removes the welcome content and should probably draw the 
 * list of kittens to the page. Good Luck
 */
function getStarted() {
  document.getElementById("welcome").remove()
  console.log('Good Luck, Take it away')
  drawKittens()
}


// --------------------------------------------- No Changes below this line are needed

/**
 * Defines the Properties of a Kitten
 * @typedef {{id: string, name: string, mood: string, affection: number}} Kitten
 */


/**
 * Used to generate a random string id for mocked
 * database generated Id
 * @returns {string}
 */
function generateId() {
  return Math.floor(Math.random() * 10000000) + "-" + Math.floor(Math.random() * 10000000)
}

loadKittens()
