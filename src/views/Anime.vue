<template>
	<v-container fluid  grid-list-md v-if="anime">
		<v-layout row wrap>
			<v-flex xs2>
				<v-card>
					<v-img :src="anime.image_url"></v-img>
				</v-card>
			</v-flex>
			<v-flex xs10>
				<v-card>
					<h1 v-for="title in titles" :key="title">
						{{ title }}
					</h1>
				</v-card>
			</v-flex>
			<v-flex xs10>
				<v-card>
					<iframe :src="anime.trailer_url" width="100%" height="auto" frameborder="0"></iframe>
				</v-card>
			</v-flex>
		</v-layout>
	</v-container>
</template>

<script>
import API from '@/apis/wrapper'
import axios from 'axios';
import tnp from 'torrent-name-parser';

export default {
	props: ['api', 'id'],
	name: 'anime',
	data() {
		return {
			anime: null,
		}
	},
	computed: {
		titles() {
			return Object.keys(this.anime)
				.filter((v) => v.startsWith('title') && v !== 'title_synonyms')
				.map((v) => this.anime[v])
				.concat(this.anime.title_synonyms);
		}
	},
	async mounted() {
		this.anime = (await API({ select: [this.api] }).get({ id: this.id }))[0];
		this.titles.forEach(async (t) => {
			const results = (await API({ select: ['nyaa'] }).search({ search: t }))[0]
				.forEach((n) => console.log(n.name, tnp(n.name, { ep: /([.\ ](\d{2})[.\ ])/ }, { ep: 'partType'})));

		});
		
	}
}
</script>

<style>

</style>
