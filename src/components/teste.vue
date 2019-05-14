<template>
    <v-card flat>
        <v-card-title :class="classe">
            <span>{{ titulo }}</span>
        </v-card-title>

        <section v-if="items.length < 1">
            <v-list class="grey lighten-3 pa-0" two-line>
                <v-layout 
                    align-center 
                    justify-center
                >
                    <v-subheader>(Nenhum)</v-subheader>
                </v-layout>
            </v-list>
        </section>

        <section v-else-if="!atributoFiltro">
            <v-list class="grey lighten-3 pa-0" two-line>
                <template v-for="(item, i) in items.slice(0, 3)">
                    <v-list-tile :key="i" :to="item[itemPath]">
                        <v-list-tile-content>
                            <v-list-tile-title v-text="item[itemTitulo]"/>
                            <v-list-tile-sub-title v-text="item[itemSubtitulo]"/>
                        </v-list-tile-content>
                        <v-list-tile-action>
                            <v-icon>mdi-chevron-right</v-icon>
                        </v-list-tile-action>
                    </v-list-tile>
                </template>
                <section v-if="items.length > 3" >
                    <v-divider class="mx-3"/>
                    <v-layout 
                        align-center 
                        justify-center
                    >
                        <v-subheader 
                            @click.stop="dialog = true"
                            :style="{ cursor: 'pointer'}"
                        >
                            Ver lista completa
                        </v-subheader>
                    </v-layout>
                    <v-dialog v-model="dialog" scrollable>
                        <v-card>
                            <v-card-title
                                :class="'headline ' + classe"
                                primary-title
                            >
                                {{ titulo }}
                            </v-card-title>
                            <v-list class="grey lighten-3 pa-0" two-line>
                                <template v-for="(item, i) in items">
                                    <v-list-tile :key="i" :to="item[itemPath]">
                                        <v-list-tile-content>
                                            <v-list-tile-title v-text="item[itemTitulo]"/>
                                            <v-list-tile-sub-title no-wrap v-text="item[itemSubtitulo]"/>
                                        </v-list-tile-content>
                                        <v-list-tile-action>
                                            <v-icon>mdi-chevron-right</v-icon>
                                        </v-list-tile-action>
                                    </v-list-tile>
                                </template>
                            </v-list>
                        </v-card>
                    </v-dialog>
                </section>
            </v-list>
        </section>

        <section v-else>
            <v-list class="grey lighten-3 pa-0" two-line>
                <section v-for="filtro in filtros" :key="filtro.nome">
                    <v-list-group
                        v-if="filteredItems[filtro.nome].length"
                        append-icon="mdi-menu-down"
                    >
                        <template v-slot:activator>
                            <v-layout>
                                <v-subheader>{{ filtro.etiqueta }}</v-subheader>
                            </v-layout>
                        </template>

                        <v-list-tile 
                            v-for="(item, i) in filteredItems[filtro.nome]" 
                            :key="filtro.nome + i" 
                            :to="item[itemPath]"
                        >
                            <v-list-tile-content>
                                <v-list-tile-title v-text="item[itemTitulo]"/>
                                <v-list-tile-sub-title no-wrap v-text="item[itemSubtitulo]"/>
                            </v-list-tile-content>
                        </v-list-tile>
                    </v-list-group>
                </section>
            </v-list>
        </section>
    </v-card>
</template>

<script>
export default {
    name: "AtributoComposto",
    props: {
        titulo: { type: String },
        items: { type: Array },
        itemTitulo: { type: String },
        itemSubtitulo: { type: String },
        itemPath: { type: String, default: 'path' },
        classe: { type: String, default: "primary lighten-1 white--text" },
        atributoFiltro: { type: String },
        filtros: { type: Array }
    },
    data () {
        return {
            dialog: false,
            filteredItems: {},
            needDialog: false
        }
    },
    created: function () {
        if (this.atributoFiltro) {
            for (var i = 0, len = this.filtros.length; i < len; i++) {
                this.filteredItems[this.filtros[i].nome] = this.items.filter(item => item[this.atributoFiltro] == this.filtros[i].nome)
            }
        }
    }
}
</script>