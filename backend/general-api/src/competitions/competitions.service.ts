import { Injectable } from '@nestjs/common';
import dayjs from 'dayjs';
import { FirebaseService } from 'src/firebase/firebase.service';

@Injectable()
export class CompetitionsService {
  constructor(private firebaseService: FirebaseService) {}

  async getCompetitionsCalendar() {
    const competitions = await this.firebaseService.getCompetitions();
    // group competitions for 'multi-period marking' in 'wix/react-native-calendars#calendar'
    /*
      <Calendar
        markingType="multi-period"
        markedDates={{
          '2017-12-14': {
            periods: [
              {startingDay: false, endingDay: true, color: '#5f9ea0'},
              {startingDay: false, endingDay: true, color: '#ffa500'},
              {startingDay: true, endingDay: false, color: '#f0e68c'}
            ]
          },
          '2017-12-15': {
            periods: [
              {startingDay: true, endingDay: false, color: '#ffa500'},
              {color: 'transparent'},
              {startingDay: false, endingDay: false, color: '#f0e68c'}
            ]
          }
        }}
      />
     */
    const colors = {
      'Competition 1': 'red',
      'my competition 3': 'green',
      'Compet. 2': 'blue',
    };

    const prepComps = competitions.reduce((acc, comp) => {
      const startDateObj = dayjs(comp.startDate * 1000);
      const startDate = startDateObj.format('YYYY-MM-DD');
      const endDateObj = dayjs(comp.endDate * 1000);
      const endDate = endDateObj.format('YYYY-MM-DD');
      // startDates
      if (acc[startDate] && acc[startDate].periods) {
        acc[startDate].periods.unshift({
          startingDay: true,
          endingDay: false,
          color: colors[comp.name],
          name: comp.name,
        });
      } else {
        acc[startDate] = {
          periods: [{ startingDay: true, endingDay: false, color: colors[comp.name], name: comp.name }],
        };
      }
      // in between dates
      const daysDiff = endDateObj.diff(startDateObj, 'day');
      for (let i = 1; i < daysDiff; i++) {
        const tmpDate = startDateObj.add(i, 'days').format('YYYY-MM-DD');
        if (acc[tmpDate] && acc[tmpDate].periods) {
          acc[tmpDate].periods.unshift({ color: colors[comp.name], name: comp.name });
        } else {
          acc[tmpDate] = { periods: [{ color: colors[comp.name], name: comp.name }] };
        }
      }
      // endDates
      if (acc[endDate] && acc[endDate].periods) {
        acc[endDate].periods.unshift({
          startingDay: false,
          endingDay: true,
          color: colors[comp.name],
          name: comp.name,
        });
      } else {
        acc[endDate] = {
          periods: [{ startingDay: false, endingDay: true, color: colors[comp.name], name: comp.name }],
        };
      }
      return acc;
    }, {});
    return prepComps;
  }

  getCompetitionsList() {
    return this.firebaseService.getCompetitions();
  }
}
