import THREE from 'three'

var buzz = new THREE.Object3D

// load a 100m cube with a Buzz texture on it, that we will attach to a geospatial object at Georgia Tech
var loader = new THREE.TextureLoader()
loader.load( '/src/buzz.png', function ( texture ) {
  var geometry = new THREE.BoxGeometry(10, 10, 10)
  var material = new THREE.MeshBasicMaterial( { map: texture } )
  var mesh = new THREE.Mesh( geometry, material )
  mesh.scale.set(10,10,10)
  buzz.add( mesh )
})

export default buzz
