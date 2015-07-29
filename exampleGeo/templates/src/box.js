import THREE from 'three'

var box = new THREE.Object3D

// create a 1m cube with a wooden box texture on it, that we will attach to the geospatial object when we create it
// Box texture from https://www.flickr.com/photos/photoshoproadmap/8640003215/sizes/l/in/photostream/
//, licensed under https://creativecommons.org/licenses/by/2.0/legalcode
var loader = new THREE.TextureLoader()
loader.load( '/src/box.png', function ( texture ) {
  var geometry = new THREE.BoxGeometry(1, 1, 1)
  var material = new THREE.MeshBasicMaterial( { map: texture } )

  var mesh = new THREE.Mesh( geometry, material )
  box.add( mesh )
})

export default box
