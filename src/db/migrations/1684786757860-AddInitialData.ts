import { MigrationInterface, QueryRunner } from "typeorm";
import { Role } from "../../api/shared/enums/role.enum";
import User from "../../api/users/entities/user.entity";
import Event from "../../api/events/entities/event.entity";
import { EventSport } from "../../api/shared/enums/event-sports.enum";
import Bet from "../../api/bets/entities/bet.entity";
import { EventScore } from "../../api/events/enums/event-score.enum";
import { encryptPassword } from "../../utils/user.utils";

export class AddInitialData1684786757860 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const encryptedPassword = await encryptPassword("admin");
    const adminUser = User.merge(new User(), {
      role: Role.ADMIN,
      firstName: "admin",
      email: "admin@mail.com",
      password: encryptedPassword,
      username: "admin",
    });

    const championsLeagueFinal = Event.merge(new Event(), {
      firstTeam: "Manchester City",
      secondTeam: "Inter de Milan",
      sport: EventSport.SOCCER,
    });

    const uefaFinal = Event.merge(new Event(), {
      firstTeam: "Sevilla",
      secondTeam: "Roma",
      sport: EventSport.SOCCER,
    });

    // Create first admin user
    await queryRunner.manager.save(adminUser);

    const firstEvent = await queryRunner.manager.save(championsLeagueFinal);
    const secondEvent = await queryRunner.manager.save(uefaFinal);

    // Creating bets
    for (const event of [firstEvent, secondEvent]) {
      const scores = Object.values(EventScore);
      for (const score of scores) {
        const bet = Bet.merge(new Bet(), {
          option: scores.indexOf(score) + 1,
          name: this.getBetName(score, event),
          odd: this.genRand(),
          sport: event.sport,
          eventId: event.id,
        });

        await queryRunner.manager.save(bet);
      }
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Nothing
  }

  private getBetName(score: EventScore, event: Event): string {
    if (score == EventScore.DRAW) return "Draw";
    const teamWinner =
      score == EventScore.FIRST_TEAM_WON ? event.firstTeam : event.secondTeam;

    return `${teamWinner} WIN`;
  }

  private genRand(min = 0, max = 2, decimalPlaces = 2) {
    const rand = Math.random() * (max - min) + min;
    const power = Math.pow(10, decimalPlaces);
    return Math.floor(rand * power) / power;
  }
}
