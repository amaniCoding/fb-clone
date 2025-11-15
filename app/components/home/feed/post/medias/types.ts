import {
  OriginalPostMediaType,
  rawMediaType,
} from "@/app/apis/feeder/[page]/lib";

export type MediaPropType = {
  medias: OriginalPostMediaType | rawMediaType;
};
