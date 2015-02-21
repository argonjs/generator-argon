import ARGON from 'argon/argon-three'
import THREE from 'three'
import buzz from './buzz'

var options = THREE.Bootstrap.createArgonOptions()
var three = THREE.Bootstrap( options )

var cameraTarget = new ARGON.Component.CameraTarget
three.argon.bindComponent(cameraTarget, three.camera)

var gatechGeoTarget = new ARGON.Component.GeoTarget({
  location: {
    lla: {
      latitude: 33.778463,
      longitude: -84.398881
    }
  }
})

three.argon.bindComponent(gatechGeoTarget, buzz)
three.scene.add(buzz)
