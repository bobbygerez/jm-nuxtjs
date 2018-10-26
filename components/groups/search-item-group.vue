<template>
<v-item-group>
                <v-container grid-list-md>
                  <v-layout wrap>
                    <v-flex
                      v-for="n in 6"
                      :key="n"
                      xs12
                      md6
                    >
                      <v-item>
                        <v-card
                          slot-scope="{ active, toggle }"
                          :color="active ? 'primary' : 'white'"
                          class="d-flex align-center"
                          dark
                          height="200"
                          @click.native="toggle"
                        >

                          <v-scroll-y-transition>
                            <div
                              v-if="active==true"
                              class="display-3 text-xs-center"
                            >
                              Active
                              <v-btn>Example </v-btn>
                            </div>
                            <div
                              v-if="active==false"
                              class="display-3 text-xs-center"
                            >
                              Active
                              <v-btn>Active False </v-btn>
                            </div>
                          </v-scroll-y-transition>
                          
                        </v-card>
                      </v-item>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-item-group>

</template>