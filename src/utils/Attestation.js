import { EAS, SchemaEncoder } from "@ethereum-attestation-service/eas-sdk";
import { Wallet, ethers } from "ethers";

export const EASContractAddress = "0xC2679fBD37d54388Ce493F1DB75320D236e1815e"; // Sepolia v0.26

// Initialize the sdk with the address of the EAS Schema contract address
const eas = new EAS(EASContractAddress);

// Gets a default provider (in production use something else like infura/alchemy)
const provider = new ethers.providers.JsonRpcProvider(
  "https://greatest-omniscient-night.ethereum-sepolia.discover.quiknode.pro/2cc20b9dea14efdccb6fa552d4380e696aca21c2/"
);

// Connects an ethers style provider/signingProvider to perform read/write functions.
// MUST be a signer to do write operations!
const signer = new Wallet(
  "b48414390d795401b54897519c27469a8d36012b30ef45ddafa326d9b3d3d8d6",
  provider
);
eas.connect(signer);

export const issueAttestation = async (location, timestamp, image) => {
  const schemaEncoder = new SchemaEncoder(
    "string location, string timestamp, string image"
  );
  const encodedData = schemaEncoder.encodeData([
    { name: "location", value: location, type: "string" },
    { name: "timestamp", value: timestamp, type: "string" },
    { name: "image", value: image, type: "string" },
  ]);

  const schemaUID =
    "0xe0772e0cd5292671ec1d655ce1ef75af09d249c66ed0bd525c5896efd761f286";

  const tx = await eas.attest({
    schema: schemaUID,
    data: {
      recipient: "0xa9E57A92dC43A2d94B7acb93A35f3035C57C6480",
      expirationTime: 0,
      revocable: false,
      data: encodedData,
    },
  });

  const newAttestationUID = await tx.wait();

  console.log("New attestation UID:", newAttestationUID);
  return newAttestationUID;
};

issueAttestation();
