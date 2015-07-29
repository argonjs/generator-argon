import Argon from 'argon/argon-three'
import THREE from 'three'
import buzz from './buzz'

var Cesium = Argon.Cesium;

// retrieve the immersive context and initialize Three.js rendering
var context = Argon.immersiveContext;
var options = THREE.Bootstrap.createArgonOptions( context )
var three = THREE.Bootstrap( options )

// We want our geolocated object start somewhere, in this case near Georgia Tech in Atlanta.
// you can adjust this to a spot closer to you (we found the lon/lat of Georgia Tech using Google Maps)
var gatechGeoEntity = new Cesium.Entity({
  name: "Georgia Tech",
  position: new Cesium.ConstantPositionProperty()
})

// create a three Object3D linked to a Cesium Entity.  Get's added to the scene for us.
var gatechGeoObject = three.argon.objectFromEntity(gatechGeoEntity)
// add the buzz object we created in buzz.js
gatechGeoObject.add(buzz)

// in the threestrap update loop
three.on('update', function(event) {
  // move buzz close to our location
  var myLocationDegrees = event.argonState.position.cartographicDegrees;
  if (myLocationDegrees) {
    var myLongitude = myLocationDegrees[0]
    var myLatitude = myLocationDegrees[1]
    var justNorthOfMePosition = Cesium.Cartesian3.fromDegrees(myLongitude, myLatitude + 0.01);
    gatechGeoEntity.position.setValue(justNorthOfMePosition)
  }
  // make buzz spin
  buzz.rotation.y += 2 * three.Time.delta
})
