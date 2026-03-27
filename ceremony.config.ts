import { defaultCopy } from "./src/copy";

export type {
  CeremonyCircuitConfig,
  CeremonyConfig,
  CeremonyCopy,
  CeremonyTierConfig,
  CircuitArtifactsConfig,
  ClientCeremonyConfig,
  ClientCircuitConfig,
  TierId,
} from "./src/types/ceremony";

import type {
  CeremonyConfig,
  ClientCeremonyConfig,
} from "./src/types/ceremony";

export function getCeremonyConfig(): CeremonyConfig {
  return ceremonyConfig;
}

export function getClientConfig(): ClientCeremonyConfig {
  const { circuits, ...rest } = ceremonyConfig;
  return {
    ...rest,
    circuits: circuits.map(({ artifacts, ...circuit }) => circuit),
  };
}

const CIRCUITS_DIR = "circuits";
const PTAU_PATH = `${CIRCUITS_DIR}/pot_final.ptau`;

export const ceremonyConfig: CeremonyConfig = {
  name: "cabure-trusted-setup",
  slug: "cabure-trusted-setup",
  description:
    "Contribute your randomness to strengthen the ceremony and improve system security.",
  targetContributions: 500,
  endDate: null,
  queueTimeoutSeconds: 300,
  verifyContributions: false,
  tiersEnabled: true,
  tiers: [
    {
      id: "core",
      label: "Required",
      description: "The essential circuit. Maximum contributor diversity.",
      estimatedMinutes: 1,
      circuitIds: ["commitment"],
    },
    {
      id: "popular",
      label: "Recommended",
      description: "Most popular circuits. Good balance of time and coverage.",
      estimatedMinutes: 2,
      circuitIds: ["commitment", "merkleTree"],
    },
    {
      id: "all",
      label: "Power User",
      description: "Full contribution. Every circuit covered.",
      estimatedMinutes: 3,
      circuitIds: ["commitment", "merkleTree", "withdraw"],
    }
  ],
  circuits: [
    {
      id: "commitment",
      label: "Commitment",
      description: "Commitment circuit.",
      constraints: "unknown",
      targetContributions: 500,
      artifacts: {
        r1csPath: "circuits/commitment.r1cs",
        ptauPath: PTAU_PATH,
      },
    },
    {
      id: "merkleTree",
      label: "MerkleTree",
      description: "MerkleTree circuit.",
      constraints: "unknown",
      targetContributions: 500,
      artifacts: {
        r1csPath: "circuits/merkleTree.r1cs",
        ptauPath: PTAU_PATH,
      },
    },
    {
      id: "withdraw",
      label: "Withdraw",
      description: "Withdraw circuit.",
      constraints: "unknown",
      targetContributions: 500,
      artifacts: {
        r1csPath: "circuits/withdraw.r1cs",
        ptauPath: PTAU_PATH,
      },
    }
  ],
  branding: {
    shortName: "CA",
    accentColor: "#95C23A",
  },
  storage: {
    manifestPath: "ceremony:manifest",
    circuitStatePrefix: "ceremony:circuits",
    receiptsPath: "ceremony:receipts",
    zkeyPrefix: "cabure-trusted-setup/zkeys",
  },
  copy: defaultCopy,
};
