import { Schema, model } from "mongoose";
import { Team } from "../interfaces/team";

const SchemaTeam = new Schema<Team>(
  {
    name: {
      type: String,
      required: true,
    },

    status: {
      type: Boolean,
      default: true,
    },

    games: [
      {
        rival: String,
        goalsConceded: Number,
        goalsScored: Number,
        date: Date,
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
