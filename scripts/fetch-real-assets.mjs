import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";

const assets = [
  {
    name: "solar panel GLB",
    url: "https://raw.githubusercontent.com/ALLTERCO/fleet-management/699a09dafce539777e69d1096f4c40ed8ee77a31/frontend/public/3d/fixtures/solar-panel.glb",
    path: "public/assets/models/solar-panel.glb",
    kind: "glb",
  },
  {
    name: "battery GLB",
    url: "https://raw.githubusercontent.com/ALLTERCO/fleet-management/699a09dafce539777e69d1096f4c40ed8ee77a31/frontend/public/3d/fixtures/battery-wall.glb",
    path: "public/assets/models/battery-wall.glb",
    kind: "glb",
  },
  {
    name: "COTEK SP-3000 inverter GLB",
    url: "https://raw.githubusercontent.com/risingtideresearch/solander-38-website/6f44fa6c1357006e8f00e5c36f03dfae9620fa99/frontend/public/models-1789414952/POWER%20ARCHITECTURE__ELEC%20BOARD%20COMPONENTS__COTEK%20SP-3000%20%283000W%29%20inverter.glb",
    path: "public/assets/models/cotek-sp-3000-inverter.glb",
    kind: "glb",
  },
  {
    name: "modern house GLB",
    url: "https://raw.githubusercontent.com/LinhTran3568/HCM/6959e0582d10c089e743f99e7fe87cada5e23a47/public/models/house-modern.glb",
    path: "public/assets/models/modern-house.glb",
    kind: "glb",
  },
  {
    name: "Rogland Sunset backdrop",
    url: "https://cdn.polyhaven.com/asset_img/primary/rogland_sunset.png?height=760&quality=95",
    path: "public/assets/images/rogland-sunset.png",
    kind: "png",
  },
  {
    name: "Painted Plaster Wall texture",
    url: "https://cdn.polyhaven.com/asset_img/primary/painted_plaster_wall.png?height=760&quality=95",
    path: "public/assets/textures/painted-plaster-wall.png",
    kind: "png",
  },
];

function validate(buffer, kind, name) {
  if (buffer.length < 32) throw new Error(`${name}: downloaded file is unexpectedly small`);

  if (kind === "glb" && buffer.toString("utf8", 0, 4) !== "glTF") {
    throw new Error(`${name}: response is not a valid GLB container`);
  }

  if (kind === "png") {
    const signature = buffer.subarray(0, 8).toString("hex");
    if (signature !== "89504e470d0a1a0a") {
      throw new Error(`${name}: response is not a PNG image`);
    }
  }
}

for (const asset of assets) {
  const response = await fetch(asset.url, {
    redirect: "follow",
    headers: {
      "User-Agent": "Watt-Power-Website-Build/1.0",
      Accept: "*/*",
    },
  });

  if (!response.ok) {
    throw new Error(`${asset.name}: HTTP ${response.status} from source URL`);
  }

  const buffer = Buffer.from(await response.arrayBuffer());
  validate(buffer, asset.kind, asset.name);

  const destination = join(process.cwd(), asset.path);
  await mkdir(dirname(destination), { recursive: true });
  await writeFile(destination, buffer);

  console.log(`[assets] ${asset.name}: ${Math.round(buffer.length / 1024)} KB → ${asset.path}`);
}
