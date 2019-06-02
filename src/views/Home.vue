<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs8 offset-xs2>
        <v-text-field
          label="Outline"
          placeholder="Placeholder"
          v-model="search"
          solo
        ></v-text-field>
      </v-flex>
      <v-flex xs12>
          <v-data-table
            :headers="headers"
            :items="torents"
            item-key='id.id'
            class="elevation-1"
          >
            <template v-slot:items="props" >
              <tr @click="anime(props.item.id)">
                <td>{{ props.item.id.id }}</td>
                <td>{{ props.item.title }}</td>
              </tr>
            </template>
          </v-data-table>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import debounce from "lodash.debounce"
  import axios from 'axios';
  import API from '@/apis/wrapper'

  export default {
    components: {
    },
    data() {
      return {
        headers: [
          { text: 'ID', value: 'id' },
          { text: 'Name', value: 'name' },
        ],
        torents: [],
        search: ''
      }
    },
    watch: {
      search: function(newSearch, oldSearch) {
        this.debounced();
      }
    },
    created: function () {
      this.debounced = debounce(this.doSearch, 500)
    },
    methods: {
      doSearch() {
        API({ select: ['mal'] })
          .search({ search: this.search, limit: 15 })
          .then(([mal]) => {
            this.torents = mal;
            console.log(mal);
          })
      },
      anime(id) {
        console.log(id);
        this.$router.push({ name: 'anime', params: { api: id.type, id: id.id }});
      }
    }
  }
</script>
