var express = require('express');
var router = express.Router();
var db = require('../db/dbConfig.js');

router.get('/', function(req, res){
	var sql = 'select * from ats_task_basic;';
	db.query(sql, function(err, result){
		if(err){
			console.log('[error]-' + err);
		} else {
			res.render('task/taskList', {
				title : "select task", 
				data : result
			});
		}
	})

})

module.exports = router;