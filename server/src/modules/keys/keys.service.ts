import {
  BadRequestException,
  NotFoundException,
} from "../../common/utils/catch-errors";
import { KeysRepository } from "./keys.repository";
import { UserService } from "../user/user.service";
import { JoinBetaDto } from "../../common/interface/keysDto";
import { BetaKey } from "@prisma/client";

export class KeysService {
  private readonly keysRepository: KeysRepository;
  private readonly userService: UserService;

  constructor(keysRepository: KeysRepository, userService: UserService) {
    this.keysRepository = keysRepository;
    this.userService = userService;
  }

  public async joinBeta({ key, user }: JoinBetaDto): Promise<BetaKey> {
    const betaKey = await this.keysRepository.getBetaKey(key);

    if (!betaKey) {
      throw new BadRequestException("Invalid or already used beta key");
    }

    if (betaKey.isUsed) {
      throw new BadRequestException("Invalid or already used beta key");
    }

    if (user.isBetaUser) {
      throw new BadRequestException("User is already a beta user");
    }

    await this.userService.findByIdAndUpdate({
      id: user.id,
      data: {
        isBetaUser: true,
      },
    });

    const updatedBetaKey = await this.keysRepository.setBetaKeyAsUsed(
      betaKey.id
    );

    if (!updatedBetaKey) {
      throw new NotFoundException("Beta Key Not Found");
    }

    return updatedBetaKey;
  }
}
