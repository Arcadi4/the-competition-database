import csv from "csv-parser";
import fs, { existsSync } from "fs";
import path from "path";

export async function importByCsv(): Promise<void> {
    const results: any[] = [];
    const dataPath = path.join(process.cwd(), "testing-data");

    if (!existsSync(dataPath)) {
        fs.mkdirSync(dataPath);
    }

    if (!existsSync(path.join(dataPath, "used"))) {
        fs.mkdirSync(path.join(dataPath, "used"));
    }

    const files = fs.readdirSync(dataPath);
    for (const file of files) {
        if (file.endsWith(".csv")) {
            fs.createReadStream(path.join(dataPath, file))
                .pipe(csv())
                .on("data", (data) => results.push(data))
                .on("end", () => {
                    fs.renameSync(
                        path.join(dataPath, file),
                        path.join(dataPath, "used", file)
                    );
                    console.log(results);
                });
        }
    }
}
