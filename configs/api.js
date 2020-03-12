import axios from 'axios';

const axiosBase = axios.create({
	baseURL: 'http://192.168.43.26:2000/'
});

export const signIn = {
	sendSignIn : (email, password) => axiosBase.post(`auth/login`, {email: email, password: password})
}

export const signUp = {
	sendSignUp : (name, email, password, avatar, banner) => axiosBase.post(`user`, {name: name, email: email, password: password, avatar: avatar, banner: banner})
}

export const mySeries = {
	loadMySeries : idUser => axiosBase.get(`userSerie/${idUser}`)
}

export const myEpisodes = {
	loadMyEpisodes : idUser => axiosBase.get(`userSerie/episodes/${idUser}`)
}


export const nextEpisodes = {
	loadNextEpisodes : idUser => axiosBase.get(`userSerie/nextEpisodes/${idUser}`)
}

export const addEpisode = {
	addMyEpisodes : (idUser, idSerie, idSeason, idEpisodes) => axiosBase.post(`userSerie/${idUser}/${idSerie}/${idSeason}/${idEpisodes}`)
}

export const removeEpisode = {
	removeMyEpisodes : (idUser, idSerie, idSeason, idEpisodes) => axiosBase.delete(`userSerie/${idUser}/${idSerie}/${idSeason}/${idEpisodes}`)
}

export const series = {
	loadSeries : () => axiosBase.get(`serie`)
}

export const seriesSearch = {
	loadSeriesSearch : (search) => axiosBase.post(`serie/pesquisa`, {search: search})
}

export const categories = {
	loadCategories : () => axiosBase.get(`category`)
}

export const viewSerie = {
	loadViewSerie : id => axiosBase.get(`serie/${id}`)
}

export const categorieSeries = {
	loadCategorieSeries : id => axiosBase.get(`categorySerie/${id}`)
}