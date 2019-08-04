const fs = require('fs');
const path = require('path');
const filePath = path.resolve(__dirname, '../static/vant');
const minify = require('minify');

/**
 * 文件体积压缩
 */
class BuildCompresser {
	constructor(filePath) {
		this.filePath = filePath;
		this.fileList = [];

		// 调用文件遍历方法
		this.fileDisplay(filePath);

		// 开始压缩
		this.compressFile();
	}

	/**
	 * 遍历文件并压缩
	 * @param {*} filePath
	 */
	fileDisplay(filePath) {
		// 根据文件路径读取文件，返回文件列表
		const files = fs.readdirSync(filePath);

		// 遍历读取到的文件列表
		files.forEach((fileName) => {
			// 获取当前文件的绝对路径
			const fileDir = path.join(filePath, fileName);
			const stats = fs.statSync(fileDir);
			const isFile = stats.isFile();
			const isDir = stats.isDirectory();

			if (isFile) {
				this.fileList.push(fileDir);
			}
			if (isDir) {
				// 递归，如果是文件夹，就继续遍历该文件夹下面的文件
				this.fileDisplay(fileDir);
			}
		});
	}

	/**
	 * 压缩文件
	 */
	compressFile() {
		// return new Promise((resolve, reject) => {

			for(let i = 0; i < this.fileList.length; i++) {
				const fileName = this.fileList[i];

				if (fileName.indexOf('wxss') !== -1) {
					// this.compressFileBySync(fileName, 'wxss', 'css');
					continue;
				}
				if (fileName.indexOf('wxml') !== -1) {
					// this.compressFileBySync(fileName, 'wxml', 'html');
					continue;
				}
				if (fileName.indexOf('json') !== -1) {
					// minify(fileName)
					// .then((data) => {
					// 	// console.log(data);
					// 	fs.writeFileSync(fileName, data);
					// })
					// .catch((error) => {
					// 	console.error(error);
					// });
					continue;
				}

				// 默认压缩
				if (fileName.indexOf('js') !== -1 && fileName.indexOf('json') === -1) {
					// console.log(fileName);
					minify(fileName)
					.then((data) => {
						// console.log(data);
						fs.writeFileSync(fileName, data);
					})
					.catch((error) => {
						console.error(error);
					});
				}
			};

			// resolve(resolveCount);
		// });
	}

	/**
	 * 压缩+改名
	 */
	compressFileBySync(fileName, oldPerfix, newPerfix) {
		// return new Promise((resolve, reject) => {
			// 改名
			const newPath = fileName.replace(oldPerfix, newPerfix);
			const oldPath = fileName;
			const renameResult = fs.renameSync(oldPath, newPath);
			console.log(renameResult, oldPath, newPath);

			// 压缩
			this.compressSingleFile(newPath).then((data) => {
				// 改回名
				const renameRepeatResult = fs.renameSync(newPath, oldPath);
				console.log(renameRepeatResult);

				// 写文件
				const fsStatus = fs.writeFileSync(fileName, data);
				// resolve(fsStatus);
			});
		// });
	}

	/**
	 * 异步压缩文件
	 * @param {*} fileName
	 */
	compressSingleFile(fileName) {
		return new Promise((resolve, reject) => {
			minify(fileName)
				.then((data) => {
					console.log(data);
					resolve(data);
				})
				.catch((error) => {
					console.error(error);
					reject(error);
				});
		});
	}
}

new BuildCompresser(filePath);
