import React, { useCallback, useEffect, useState } from "react";
import Daypicker, { DayModifiers } from "react-day-picker";
import "react-day-picker/lib/style.css";
import {
  Container,
  Header,
  HeaderContent,
  Profile,
  Content,
  Schedule,
  Calendar,
  NextAppointment,
  Section,
  Appointment,
} from "./styles";

import logoImg from "../../assets/logo.svg";
import { FiClock, FiPower } from "react-icons/fi";
import { useAuth } from "../../hooks/auth";
import api from "../../services/api";

interface MonthAvailabilityItem {
  day: number;
  available: boolean;
}

const Dashboard: React.FC = () => {
  const { signOut, user } = useAuth();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [monthAvailability, setMonthAvailability] = useState<
    MonthAvailabilityItem[]
  >();

  const handleDateChange = useCallback((day: Date, modifiers: DayModifiers) => {
    if (modifiers.available) {
      setSelectedDate(day);
    }
  }, []);

  const handleMonthChange = useCallback((month: Date) => {
    setCurrentMonth(month);
  }, []);

  useEffect(() => {
    api
      .get(`/providers/${user.id}/month-availability`, {
        params: {
          yaer: currentMonth.getFullYear(),
          month: currentMonth.getMonth() + 1,
        },
      })
      .then((response) => {
        setMonthAvailability(response.data);
      });
  }, [currentMonth, user.id]);

  return (
    <Container>
      <Header>
        <HeaderContent>
          <img src={logoImg} alt="GOBarber" />

          <Profile>
            <img src={user.avatar_url} alt={user.name} />
            <div>
              <span>Bem-vindo,</span>
              <strong>{user.name}</strong>
            </div>
          </Profile>

          <button type="button" onClick={signOut}>
            <FiPower />
          </button>
        </HeaderContent>
      </Header>

      <Content>
        <Schedule>
          <h1>scheduled times</h1>
          <p>
            <span>Today</span>
            <span>Day 06</span>
            <span>Monday</span>
          </p>

          <NextAppointment>
            <strong>Next Appointment</strong>
            <div>
              <img
                src="https://avatars.githubusercontent.com/u/56568406?s=460&u=6341df1b4aadb55298fca931b7c88d957896f2c8&v=4"
                alt="Elton campos"
              />
              <strong>Elton de Campos</strong>
              <span>
                <FiClock />
                08:00
              </span>
            </div>
          </NextAppointment>

          <Section>
            <strong>Morning</strong>

            <Appointment>
              <span>
                <FiClock />
                08:00
              </span>

              <div>
                <img
                  src="https://avatars.githubusercontent.com/u/56568406?s=460&u=6341df1b4aadb55298fca931b7c88d957896f2c8&v=4"
                  alt="Elton campos"
                />
                <strong>Elton de Campos</strong>
              </div>
            </Appointment>
          </Section>

          <Section>
            <strong>Evening</strong>

            <Appointment>
              <span>
                <FiClock />
                08:00
              </span>

              <div>
                <img
                  src="https://avatars.githubusercontent.com/u/56568406?s=460&u=6341df1b4aadb55298fca931b7c88d957896f2c8&v=4"
                  alt="Elton campos"
                />
                <strong>Elton de Campos</strong>
              </div>
            </Appointment>

            <Appointment>
              <span>
                <FiClock />
                08:00
              </span>

              <div>
                <img
                  src="https://avatars.githubusercontent.com/u/56568406?s=460&u=6341df1b4aadb55298fca931b7c88d957896f2c8&v=4"
                  alt="Elton campos"
                />
                <strong>Elton de Campos</strong>
              </div>
            </Appointment>
          </Section>
        </Schedule>
        <Calendar>
          <Daypicker
            fromMonth={new Date()}
            disabledDays={[{ daysOfWeek: [0, 6] }]}
            modifiers={{
              available: { daysOfWeek: [1, 2, 3, 4, 5] },
            }}
            selectedDays={selectedDate}
            onDayClick={handleDateChange}
            onMonthChange={handleMonthChange}
          />
        </Calendar>
      </Content>
    </Container>
  );
};
export default Dashboard;
