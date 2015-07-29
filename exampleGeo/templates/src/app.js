import ARGON from 'argon/argon-three'
import THREE from 'three'
import buzz from './buzz'
import box form './box'

// make floating point output a little less ugly
function toFixed(value, precision) {
  var power = Math.pow(10, precision || 0);
  return String(Math.round(value * power) / power);
}

// retrieve the immersive context and initialize Three.js rendering
var context = Argon.immersiveContext;
var options = THREE.Bootstrap.createArgonOptions( context )
var three = THREE.Bootstrap( options )

// All geospatial objects need to have an Object3D linked to a Cesium Entity.
// We need to do this because Argon needs a mapping between Entities and Object3Ds.
//
// Here we create two objects, showing two slightly different approaches.
//
// First, we position a cube near Georgia Tech using a known LLA.
//
// Second, we will position a cube near our starting location.  This geolocated object starts without a
// location, until our reality is set and we know the location.  Each time the reality changes, we update
// the cube position.

// We want our geolocated object start somewhere, in this case near Georgia Tech in Atlanta.
// you should probably adjust this to a spot closer to you (we found the lon/lat of Georgia Tech using Google Maps)
var gatechGeoEntity = new Argon.Cesium.Entity({
  name: "Georgia Tech",
  position: Argon.Cesium.Cartesian3.fromDegrees(-84.398881, 33.778463)
})

// create a three Object3D linked to a Cesium Entity.  Get's added to the scene for us.
var gatechGeoObject = three.argon.objectFromEntity(gatechGeoEntity)
// add the buzz object we created in buzz.js
gatechGeoObject.add(buzz)

// Create our second object, and add the box we created in box.js
var boxGeoObject = new THREE.Object3D;
boxGeoObject.add(box)
three.scene.add(boxGeoObject)
// create a Cesium Entity linked to our Object3D
var boxGeoEntity = three.argon.entityFromObject(boxGeoObject)

// each time our context is assigned a new Reality, including the first time, we receive
// a "realityChange" event.  We should do initialization that is based on the state of the
// world here.
//
// The state parameter has the follow entries = {
//   reality: Argon.Reality,
//   previousReality: Argon.Reality
// }
// state.previousReality will be undefined the first time
//
var realityInit = false
var geoObjectPos = [0,0,0]

three.on("argon:realityChange", function(event) {
  realityInit = true;

  // set the position to be near the camera
  var cameraPosition = three.camera.getWorldPosition();
  cameraPosition.x += 5;
  geoObject.position.copy(cameraPosition)
  three.argon.updateEntityFromObject(boxGeoObject)

  // getCartographicDegreesFromEntity will return undefined if
  // this Reality does not support geographic coordinates
  geoObjectPos = three.argon.getCartographicDegreesFromEntity(boxGeoEntity) || [0,0,0]
})

// Argon's update state is stored in the threestrap update event.argonState field.
// In general, this is only needed if you need to know lower-level information from Argon, such as the
// raw geolocation, which we grab and print in a div on the bottom of the screen
//
// The state parameter has the following entries = {
//    frameNumber: integer,
//    time: a Cesium time for the update,
//    referenceFrame: the root reference, either Cesium ReferenceFrame.FIXED or {id: frameId},
//    position: {
//       cartesian: Cesium.Cartesian,
//       cartographicDegrees: [longitude, latitude, height]
//    },
//    orientation: {
//       unitQuaternion: Cesium.Quaternion, // orientation in reference frame
//       unitQuaternionRelative: Cesium.Quaternion, // orientation relative to local origin
//    },
//    frustum: {
//       fov: number,
//       fovy: number,
//       aspectRatio: number
//    },
//    reality: {id: realityID}
//  }

// in the threestrap update loop, update the screen feedback based on the world state.
three.on('update', function(event) {
  var elem = document.getElementById('location');
  var state = event.argonState
  // ignore updates until we have a reality
  if (!realityInit) {
    elem.innerText = "No Reality Yet"
    return
  }
  // cartographicDegrees is a 3 element arry containing [latitude, longitude, height]
  var gpsPos = [0,0,0];
  if (state.position.cartographicDegrees) {
    gpsPos = state.position.cartographicDegrees;
  }

  // make it a little less boring
  buzz.rotation.y += 2 * three.Time.delta
  //buzz.quaternion.normalize()
  box.rotation.y += 3 * three.Time.delta
  //box.quaternion.normalize()
  // we'll compute the distance to the cube, just for fun. If the cube could be further away,
  // we'd want to use Cesium.EllipsoidGeodesic, rather than Euclidean distance, but this is fine here.
  var point1 = three.camera.getWorldPosition();
  var point2 = buzz.getWorldPosition();
  var point3 = box.getWorldPosition();
  var distance = point1.distanceTo( point2 );
  var distance2 = point1.distanceTo( point3 );

  // create some feedback text
  elem.innerText = "Geospatial Argon example:\n"
  // elem.innerText = "frame: " + state.frameNumber;
  // elem.innerText = elem.innerText + " argon time (" + toFixed(three.argon.time.secondsOfDay, 1) + ")";
  // elem.innerText = elem.innerText + " three time (" + toFixed(three.Time.now, 1) + ")\n";
  elem.innerText = elem.innerText + "eye (" + toFixed(gpsPos[0],6) + ", ";
  elem.innerText = elem.innerText + toFixed(gpsPos[1], 6) + ", " + toFixed(gpsPos[2], 2) + ")\n";
  elem.innerText = elem.innerText + "cube(" + toFixed(geoObjectPos[0], 6) + ", ";
  elem.innerText = elem.innerText + toFixed(geoObjectPos[1], 6) + ", " + toFixed(geoObjectPos[1],2) + ")\n";
  elem.innerText = elem.innerText + " distance to GT (" + toFixed(distance,2) + ")";
  elem.innerText = elem.innerText + " distance to box (" + toFixed(distance2,2) + ")";
})
