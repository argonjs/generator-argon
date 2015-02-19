import THREE from 'three.js'

var buzz = new THREE.Object3D

var loader = new THREE.TextureLoader()
loader.load( '/lib/buzz.png', function ( texture ) {
  var geometry = new THREE.BoxGeometry(50, 50, 50)
  var material = new THREE.MeshBasicMaterial( { map: texture } )
  var mesh = new THREE.Mesh( geometry, material )
  mesh.scale.set(1000,1000,1000)
  buzz.add( mesh )
})

export default buzz
