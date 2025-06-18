import { useState } from 'react';
import * as S from './style';
import DelScheduleModal from '@/components/modal/DelScheduleModal';
import AddScheduleModal from '@/components/modal/AddScheduleModal';
import EditScheduleModal from '@/components/modal/EditScheduleModal';
import FixedTimeTable from '@/components/timeTable/FixedTimeTable';
import Navbar from '@/layouts/Navbar';
import addIcon from '@/assets/img/icon/plus.svg';

import { useUserInfo } from '@/hooks/stores/auth/useUserStore';
import useGetUserData from '@/hooks/queries/useGetUserData';
import useCreateFixedSchedules from '@/hooks/mutations/useCreateFixedSchedules';
import usePatchFixedSchedule from '@/hooks/mutations/usePatchFixedSchedule';
import useDeleteFixedSchedule from '@/hooks/mutations/useDeleteFixedSchedule';
import DeferredLoader from '@/components/ui/DeferredLoader';

const DEFAULT_START = { hour: 9, minute: 0 };
const DEFAULT_END = { hour: 18, minute: 0 };

const EnterSchedulePage = () => {
  const [open, setOpen] = useState(false);
  const [delOpen, setDelOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [editingSchedule, setEditingSchedule] = useState(null);
  const [deletingSchedule, setDeletingSchedule] = useState(null);

  const { userId } = useUserInfo();
  const { isPending: isGetUserDataPending } = useGetUserData(userId);

  const { mutate: createSchedule, isPending: isCreatePending } = useCreateFixedSchedules();
  const { mutate: updateSchedule, isPending: isEditPending } = usePatchFixedSchedule();
  const { mutate: deleteSchedule, isPending: isDeletePending } = useDeleteFixedSchedule();

  // 일정 수정
  const handleEditSchedule = (schedule) => {
    setEditingSchedule(schedule);
    setEditOpen(true);
  };

  const handleUpdateSchedule = (schedule) => {
    updateSchedule({ fixedSchedule: schedule });
    setEditOpen(false);
    setEditingSchedule(null);
  };

  // 삭제 버튼 클릭 시
  const handleAskDeleteSchedule = (schedule) => {
    setDeletingSchedule(schedule);
    setDelOpen(true);
  };

  // 실제 삭제
  const handleDeleteSchedule = (scheduleId) => {
    deleteSchedule({ scheduleId });
    setDelOpen(false);
    setDeletingSchedule(null);
  };

  const handleAddSchedules = (schedules) => {
    createSchedule({ fixedSchedules: schedules });
    setOpen(false);
  };

  const isPending = isGetUserDataPending || isCreatePending || isEditPending || isDeletePending;

  return (
    <>
      {isPending ? (
        <DeferredLoader />
      ) : (
        <>
          <S.Container>
            <S.TopBar>
              <S.FixedScheduleTitle>고정 일정</S.FixedScheduleTitle>
              <S.ButtonOptions>
                <S.AddScheduleButton onClick={() => setOpen(true)}>
                  <img src={addIcon} alt="Add" />
                </S.AddScheduleButton>
              </S.ButtonOptions>
            </S.TopBar>
            <S.TableScrollWrapper>
              <FixedTimeTable
                defaultStart={DEFAULT_START}
                defaultEnd={DEFAULT_END}
                onEdit={handleEditSchedule}
                onDelete={handleAskDeleteSchedule}
              />
            </S.TableScrollWrapper>
            <AddScheduleModal
              isOpen={open}
              onClose={() => setOpen(false)}
              onAdd={handleAddSchedules}
            />
            <EditScheduleModal
              isOpen={editOpen}
              schedule={editingSchedule}
              onClose={() => setEditOpen(false)}
              onUpdate={handleUpdateSchedule}
            />
            <DelScheduleModal
              isOpen={delOpen}
              schedule={deletingSchedule}
              onClose={() => setDelOpen(false)}
              onDelete={handleDeleteSchedule}
            />
          </S.Container>
          <Navbar />
        </>
      )}
    </>
  );
};

export default EnterSchedulePage;
