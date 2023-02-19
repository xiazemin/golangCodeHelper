// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as fs from 'fs';
import * as nodepath from 'path';
const {jsonToGo} =require('./json-to-go/json-to-go.js');
const {curlToGo} =require('./curl-to-go/resources/js/curl-to-go.js');
const{curlToGoStruct}=require('./curl-to-gostruct/curl-to-gostruct.js')
/**
 * 
 * @param path 写入的文件路径
 * @param content 写入的文件内容
 * @param fileName 写入的文件名
 * @param fileNameExtra 当文件名存在于该文件夹下时的替代文件名
 */

const writeFile = (path: string, content: string, fileName?: string | undefined, fileNameExtra?: string | undefined) => {
	let newfileName = fileName || 'json_to_go.go';
	const opt = {
		flag: 'wx' // 但是如果文件路径存在，则文件写入失败。 覆盖写入： 'w'
	};
	const exists: boolean = fs.existsSync(`${path}${nodepath.sep}${newfileName}`);
	if (exists) {
		newfileName = fileNameExtra || fileNameExtra+'_副本.go';
	}
	console.log(`写入路径:${path}${nodepath.sep}${newfileName}`);
	fs.writeFile(`${path}${nodepath.sep}${newfileName}`, content, opt, (err) => {
		if (err) {
				vscode.window.showErrorMessage(`写入${newfileName}失败,可能原因是，改文件夹下已存在${newfileName}`);
				return;
		}
		vscode.window.showInformationMessage(`已生成一个示例${newfileName}`);
	});
};

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "golangCodeHelper" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('golangCodeHelper.helloWorld', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from golangCodeHelper!');
	});

	let JsonToGo = vscode.commands.registerCommand('golangCodeHelper.JsonToGo', (e) => {
		vscode.window.showInformationMessage('JsonToGo from golangCodeHelper!');
		const filename = e ? e?.fsPath?.split('/').pop() : vscode.window.activeTextEditor?.document.fileName.split('/').pop();
		vscode.window.showInformationMessage(filename+"->"+e.fsPath);
		var data=fs.readFileSync(e.fsPath,"utf-8");
		vscode.window.showInformationMessage(data);
		console.log(data)
		console.log(jsonToGo)
		const got = jsonToGo(data, null, null, false);
		console.log(got)
		vscode.window.showInformationMessage(got);
		if (got.error) {
			vscode.window.showInformationMessage(`JsonToGo from golangCodeHelper failed! ${got.error}`);
		} else {
			writeFile(nodepath.dirname(e.fsPath), got.go,'json-to-go.go');
		}
	});

	let CurlToGo = vscode.commands.registerCommand('golangCodeHelper.CurlToGo', (e) => {
		vscode.window.showInformationMessage('curlToGo from golangCodeHelper!');
		const filename = e ? e?.fsPath?.split('/').pop() : vscode.window.activeTextEditor?.document.fileName.split('/').pop();
		vscode.window.showInformationMessage(filename+"->"+e.fsPath);
		var data=fs.readFileSync(e.fsPath,"utf-8");
		vscode.window.showInformationMessage(data);
		console.log(data)
		console.log(curlToGo)
		const got = curlToGo(data, null, null, false);
		console.log(got)
		vscode.window.showInformationMessage(got);
		writeFile(nodepath.dirname(e.fsPath), got,"curl-to-go.go");
	});

	let CurlToGoStructs = vscode.commands.registerCommand('golangCodeHelper.CurlToGoStructs', (e) => {
		vscode.window.showInformationMessage('CurlToGoStructs from golangCodeHelper!');
		const filename = e ? e?.fsPath?.split('/').pop() : vscode.window.activeTextEditor?.document.fileName.split('/').pop();
		vscode.window.showInformationMessage(filename+"->"+e.fsPath);
		var data=fs.readFileSync(e.fsPath,"utf-8");
		vscode.window.showInformationMessage(data);
		console.log(data)
		console.log(curlToGoStruct)
		const got = curlToGoStruct(data, null, null, false);
		console.log(got)
		vscode.window.showInformationMessage(got);
		writeFile(nodepath.dirname(e.fsPath), got,"curl-to-go-struct.go");
	});

	context.subscriptions.push(disposable);
	context.subscriptions.push(JsonToGo);
	context.subscriptions.push(CurlToGo);
	context.subscriptions.push(CurlToGoStructs);
}

// This method is called when your extension is deactivated
export function deactivate() {}
