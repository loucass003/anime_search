<template>
  <!-- <HelloWorld /> -->
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
            class="elevation-1"
          >
            <template v-slot:items="props">
              <td>{{ props.item.id }}</td>
              <td>{{ props.item.name }}</td>
              <td>{{ props.item.seeders }}</td>
              <td>{{ props.item.leechers }}</td>
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
          { text: 'Seeders', value: 'seeders' },
          { text: 'Leechers', value: 'leechers' }
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
        console.log("call");
        API({ select: ['mal'] })
          .search({ search: this.search })
          .then((data) => {
            console.log(data);
           // this.torents = torrents
          })
      }
    }
  }
</script>
