<template>
  <v-timeline>
    <v-timeline-item
      v-for="n in 4"
      :key="n"
      color="red lighten-2"
      large
    >
      <span slot="opposite">Tus eu perfecto asdfds asdfasdf Tus eu perfecto asdfds asdfasdf Tus eu perfecto asdfds asdfasdf</span>
      <v-card class="elevation-2">
        <v-card-title class="headline">Lorem ipsum</v-card-title>
        <v-card-text>
          <GmapMap
            :center="{lat:12.879721, lng:121.774017}"
            :zoom="7"
            map-type-id="terrain"
            style="width: 100%; height: 500px"
          >
            <GmapMarker
              :position="markersPosition"
              :clickable="true"
              :draggable="true"
              @dragend="dragend($event.latLng)"
              @click="infoWindow.open=true"
            />
            <gmap-info-window
              :position="markersPosition"
              :opened="infoWindow.open"
              @closeclick="infoWindow.open=false">

              <div>
                  <p>
                    <strong>Example Title</strong>
                    <br />
                    <span>contactNumber </span>

                  </p>
              </div>
              <div><strong>receiverFirstname receiverLastname</strong> <br />
              <span>ontactNumber</span><br />
              <span>textBrgy</span><br />
              <span>textCity textProvince</span>

              </div>
          </gmap-info-window>
          </GmapMap>
        </v-card-text>
      </v-card>
    </v-timeline-item>
  </v-timeline>
</template>

<script type="text/javascript">
import vue2GoogleMaps from '~/components/google-maps/vue2-google-maps'
  export default {
    data: ()=>({
      infoWindow: {
          open: false,
        },
      markersPosition: {lat: 12.879721, lng: 121.774017},
    }),
    components: { vue2GoogleMaps },
    methods: {

      dragend(latLng){
        this.markersPosition = { lat: latLng.lat(), lng: latLng.lng() };
      },

    }
  }
</script>