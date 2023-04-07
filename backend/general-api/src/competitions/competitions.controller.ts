import { Controller, Get } from '@nestjs/common';
import { CompetitionsService } from './competitions.service';

@Controller('competitions')
export class CompetitionsController {
  constructor(private readonly competitionsService: CompetitionsService) {}

  @Get()
  competitionsCalendar() {
    return this.competitionsService.getCompetitionsCalendar();
  }

  @Get('list')
  competitionsList() {
    return this.competitionsService.getCompetitionsList();
  }
}
