import { Schema, model } from "mongoose";
import { Team } from "../interfaces/team";

const SchemaTeam = new Schema<Team>(
  {
    name: {
      type: String,
      required: true,
    },
    games: [
      {
        rival: String,
        goalsConceded: Number,
        goalsScored: Number,
        date: String,
        points: Number,
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const TeamModel = model("Team", SchemaTeam);
