let express = require('express');
let router = express.Router();
let db = require('../db/dbConfig.js');

// 查询页面
router.get('/select', function(req, res){
	let sql = 'select * from ats_task_basic;';
	db.query(sql, function(err, result){
		if(err){
			console.log('[error]-' + err);
		} else {
			res.render('task/selectList', {
				title : "select task", 
				data : result
			});
		}
	});

});

// 新增页面
router.get('/add', function (req, res) {
	// let sql = 'select * from ats_task_basic;';
	res.render('task/addList', {
		title : 'add task'
	});

});

// 新增操作
router.post('/doAdd', function (req, res) {
	let id = req.body.id;
	let name = req.body.machine;

	let sql = 'INSERT INTO `ats_task_basic` (`task_id`, `machine_id`, `machine_name`, `category`, `lan_ip`, `shelf_switch`, `dmi_product_name`, `dmi_part_number`, `dmi_serial_number`, `dmi_oem_string`, `dmi_system_config`, `bios_ec`, `status`, `process`, `task_create_time`, `task_start_time`, `tester`) ' +
		'VALUES (NULL, ? , ? , \'In_House\', \'192.168\', \'1_11\', \'dynabook\', \'PS68NNP\', \'7G\', \'PRT10U\', \'1\', \'234\', \'expired\', \'0\', \'2018-12-19 22:07:13\', \'2018-12-19 22:07:23\', \'Zhao Tianer\');'

	db.excute(sql, [id, name], function(err, result){
		if(err){
			console.log('[error]-' + err);
			res.json({msg : err});
		} else {
			res.redirect('/task/select');
			// res.json({msg : 'add success'}); // Can't set headers after they are sent.
		}
	})

});

// 删除操作
router.get('/doDelete/:id', function (req, res) {
	let id = req.params.id;

	// res.send(id);

	let sql = 'delete from ats_task_basic where task_id = ?';

	db.excute(sql, [id], function (err, result) {
		if (err) {
			console.log('[error]-' + err);
			res.json({msg : err});
		} else {
			res.redirect('/task/select');
		}
	})
});

module.exports = router;