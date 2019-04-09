#!/usr/bin/env node
import * as commander from "commander";
import * as open from "open";
import * as chalk from "chalk";
import * as puppeteer from "puppeteer";
import * as mkdirp from "mkdirp";
import * as Progress from "progress";
import * as fs from "fs";
commander
	.arguments("<number>")
	.description(
		"원하는 백준 문제 번호를 입력해주세요.\n폴더가 생성될 곳에서 명령어를 실행해 주세요"
	)
	.option(
		"-p, --path <path>",
		"원하는 path를 설정해주세요. 안넣는다면 현재 디렉토리에 생성됩니다."
	)
	.action(async function(number: number) {
		const bar = new Progress("running [:bar] :percent :etas", {
			complete: "=",
			incomplete: " ",
			width: 20,
			total: 10
		});
		const path = commander.path ? commander.path : ".";
		mkdirp.sync(`${path}/${number}`);
		bar.tick();
		try {
			const browser: any = await puppeteer.launch();
			bar.tick();
			const page: any = await browser.newPage();
			bar.tick();
			await page.goto(`https://www.acmicpc.net/problem/${number}`);
			bar.tick();
			const sizeElement = await page.$(".content .row");
			bar.tick();
			const { height } = await sizeElement.boundingBox();
			bar.tick();
			await page.screenshot({
				path: `${path}/${number}/problem.png`,
				clip: { x: 0, y: 308, height: height - 160, width: 800 }
			});
			bar.tick();
			bar.tick();
			fs.copyFileSync("./bin/main.cpp", `${path}/${number}/main.cpp`);
			bar.tick();
			const response: Promise<any> = await open(
				`https://www.acmicpc.net/submit/${number}`,
				{ wait: false }
			);

			if (response instanceof Error) {
				console.log(chalk.default.red(response.message));
			} else {
				bar.tick();
				console.log(
					chalk.default.yellow(
						`Complete Hack Your Code! on ${number}`
					)
				);
				process.exit(1);
			}
		} catch (err) {
			console.log(chalk.default.red(err));
		}
	})
	.parse(process.argv);
