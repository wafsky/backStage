const express = require('express')
const City = require("./model/city")
const Movie = require("./model/movie")
const app = new express()
const bodyParser = require('body-parser')
const multer = require('multer')


var storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'uploads')
	},
	filename: function (req, file, cb) {
		cb(null, file.fieldname + '-' + Date.now() + file.originalname)
	}
})

var upload = multer({ storage: storage })


app.use("/uploads", express.static("uploads"))

app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())




app.post('/user/login', function (req, res) {
	// req.session.token='加密算法生成随机token'
	// const data={"code":20000,"data":{"roles":["editor"],"token":req.session.token,"introduction":"I am a super administrator","avatar":"https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif","name":"Super Admin"}}
	const data = {
		"code": 20000, "data": {
			"token": "asasasasas", "orangiseid": 'wwwwwwww', "introduction": "I am a super administrator",
			"avatar": "https://dgss0.bdstatic.com/5bVWsj_p_tVS5dKfpU_Y_D3/res/r/image/2020-09-22/7afe3efb3e8fb391539e4e821e9ece28.jpg", "name": "Super Admin"
		}
	}
	res.json(data)
})
app.get('/user/info', function (req, res) {
	const data = { "code": 20000, "data": { "roles": ["editor"], "introduction": "I am a super administrator", "avatar": "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif", "name": "Super Admin" } }
	res.json(data)
})
app.post('/user/logout', function (req, res) {
	res.json({ "code": 20000, "message": "success" })
})




//添加城市

app.post("/city/create", (req, res) => {
	const city = new City(req.body)
	city.save().then(mon => {
		if (mon) {
			res.json({
				code: 20000,
				msg: "数据添加成功"
			})
		}
	})
})


//城市列表
app.get("/cityss", (req, res) => {

	City.find().then(mon => {
		if (mon) {
			res.json({
				code: 20000,
				list: mon
			})
		}
	})
})


//城市列表分页
app.get("/citys", async (req, res) => {
	const page = Number(req.query.page) || 1
	const pageSize = Number(req.query.pageSize) || 3
	var start = (page - 1) * pageSize

	const total = await City.find()
	const result = await City.find().skip(start).limit(pageSize)
	res.json({
		code: 20000,
		list: result,
		total: total.length
	})

})

//删除城市

app.delete("/delcity/:id", (req, res) => {
	City.findByIdAndDelete(req.params.id).then(mon => {
		res.json({
			code: 20000,
			msg: "删除成功"
		})
	})
})

//单个城市
app.get("/city/:id", (req, res) => {
	City.findById(req.params.id).then(mon => {
		res.json({
			code: 20000,
			data: mon
		})
	})
})

//修改
app.put("/cityEdit", (req, res) => {
	City.findByIdAndUpdate(req.body._id, req.body).then(mon => {
		if (mon) {
			// console.log(mon)
			res.json({
				code: 20000,
				msg: "数据修改成功"
			})
		}
	})
})

//图片上传
app.post("/upload", upload.single("avatar"), (req, res, next) => {
	res.json({
		code: 20000,
		msg: "图片上传成功",
		path: req.file.path
	})
})


//添加电影

app.post("/movie/create", (req, res) => {
	const movie = new Movie(req.body)
	movie.save().then(mon => {
		if (mon) {
			res.json({
				code: 20000,
				msg: "数据添加成功"
			})
		}
	})
})



//电影列表
app.get("/movies", async (req, res) => {
	const page = Number(req.query.page) || 1
	const pageSize = Number(req.query.pageSize) || 3
	var start = (page - 1) * pageSize
	const total = await Movie.find()
	const result = await Movie.find().skip(start).limit(pageSize).populate("p")
	res.json({
		code: 20000,
		list: result,
		total: total.length
	})

})


//删除电影

app.delete("/delmovie/:id", (req, res) => {
	// console.log(req.params.id);
	Movie.findByIdAndDelete(req.params.id).then(mon => {
		res.json({
			code: 20000,
			msg: "删除成功"
		})
	})
})


app.get("/movie/:id", (req, res) => {
	Movie.findById(req.params.id).then(mon => {
		res.json({
			code: 20000,
			data: mon
		})
	})
})

app.put("/movieEdit", (req, res) => {
	Movie.findByIdAndUpdate(req.body._id, req.body).then(mon => {
		if (mon) {
			// console.log(mon)
			res.json({
				code: 20000,
				msg: "数据修改成功"
			})
		}
	})
})



app.listen(8888, '127.0.0.1')
