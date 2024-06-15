<template>
  <div class="cv-form">
    <div class="cv-form__header" v-if="!hideHeader">
      <img class="cv-form__header-img" :src="resume.user.image.image" alt="image"/>

      <div class="cv-form__header-info">
        <div class="flex flex-col">
          <p class="text-base font-bold">{{getFullName(resume.user, 'full')}}</p>
          <div class="flex gap-y-[5px] gap-x-[10px]">
            <span class="text-xs">{{ formatDate(resume.user?.dateOfBirth) }}, {{ resume.user?.sex === 0 ? 'Мужчина' : 'Женщина' }}</span>
            <span class="text-xs text-gray" v-if="resume.user?.city">г. {{ resume.user?.city?.name }}</span
            >
          </div>
        </div>

        <div class="flex flex-col">
          <div class="text-sm" v-if="resume.contactMail">
            <b class="font-bold">E-mail: </b>
            <span>{{ resume.contactMail }}</span>
          </div>

          <div class="text-sm" v-if="resume.contactPhone">
            <b class="font-bold">Телефон: </b>
            <span>{{ resume.contactPhone }}</span>
          </div>
        </div>
      </div>

      <Image
        class="cv-form__header-logo"
        src="/public/images/logo.png"
        alt="logo"
        width="139"
      />
    </div>

    <div>
      <p class="cv-table-title">Желаемая должность</p>

      <div class="cv-table border-b-none">
        <div class="col-span-2 flex flex-col">
          <p class="text-base font-bold">{{ resume?.position?.name }}</p>
          <p class="text-sm mt-2.5"><b>Специализация:</b> {{ resume.specialization?.name }}</p>

          <div class="flex items-center gap-x-[15px] mt-4">
            <p class="text-base" v-if="resume.salary">₽{{ resume.salary }}</p>

            <div class="flex items-center gap-x-2.5">
              <Chip v-if="resume.employment" :label="resume.employment.name"/>
              <Chip v-if="resume.format" :label="resume.format.name"/>
            </div>

          </div>
        </div>
      </div>
    </div>

    <div v-if="resume.userPositions.length">
      <p class="cv-table-title">Опыт работы</p>

      <div class="cv-table" v-for="position in resume.userPositions" :key="position.id">
        <div>{{formatDate(position.startDate)}} — {{ position.endDate ?  formatDate(position.endDate) : 'Настоящее время'}}</div>
        <div class="flex flex-col">
          <p class="text-sm font-bold mb-2.5">{{position.position?.name}}, {{ position.company.name }}</p>

          <div class="flex flex-col gap-y-1">
            <p class="text-big-xs" v-html="position.description"/>
          </div>
        </div>
      </div>
    </div>

    <div v-if="resume.resumeProgramSchools?.length">
      <p class="cv-table-title">Образование</p>

      <div class="cv-table" v-for="scholl in resume.resumeProgramSchools" :key="scholl.id">
        <div>{{ getLocalDate(scholl.endDate)?.year }}</div>
        <div class="flex flex-col gap-y-[5px]">
          <p class="text-sm font-bold break-word">{{ scholl.programSchool?.school?.name }}</p>
          <p class="text-big-xs">{{scholl.programSchool.program.name}}</p>
        </div>
      </div>
    </div>

    <div v-if="resume.skills?.length || resume.languageLevels?.length">
      <p class="cv-table-title">Навыки и языки</p>

      <div class="cv-table" v-if="resume.skills?.length">
        <div>Ключевые навыки</div>
        <div class="flex flex-wrap gap-[5px]">
          <SkillChip v-for="skill in resume.skills" :key="skill.id" :label="skill.name"/>
        </div>
      </div>
      <div class="cv-table" v-if="resume.languageLevels?.length">
        <div>Языки</div>
        <div class="flex flex-col">
          <p class="text-big-xs" v-for="lang in resume.languageLevels" :key="lang.id"><b>{{ lang.language.name }}</b> — {{ lang.level.name }}</p>
        </div>
      </div>
    </div>

    <div>
      <template v-if="resume.description">
        <p class="cv-table-title">Дополнительно</p>

        <div class="cv-table">
          <div class="col-span-2">
            {{resume.description}}
          </div>
        </div>
      </template>


      <div class="text-xs font-medium text-gray text-center mt-2.5 pb-4">
        Обновлено {{ getFormattedTime(resume.updatedAt) }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { Resume } from '@/stores/types/schema'
  import { getFormattedTime, formatDate, getLocalDate } from '@/utils/functions/get-formatted-time';
  import { getFullName } from '@/utils/functions/get-full-name';

  interface Props {
    hideHeader: boolean
    resume: Resume
  }

  defineProps<Props>()
</script>

<style scoped lang="scss">
  .cv-form {
    @apply w-full h-full flex flex-col /* border-b border-light-gray */ gap-y-10;

    &__header {
      @apply grid gap-x-[20px];

      grid-template-columns: 130px auto 140px;

      &-img {
        @apply w-full aspect-square rounded-[10px] bg-gray;
      }

      &-info {
        @apply flex flex-col gap-y-[25px] my-auto;
      }

      &-logo {
        @apply mt-[30px];
      }
    }

    .cv-table-title {
      @apply text-sm font-bold text-blue pb-[5px];
    }

    .cv-table {
      @apply grid border-y border-light-gray border-collapse;
      grid-template-columns: 39% 61%;

      &:nth-child(n + 3) {
        border-top: none;
      }

      & > div {
        @apply py-5 ;
      }

      & > div:nth-child(odd):not(.col-span-2) {
        @apply text-xs text-gray;
      }

      & > div:nth-child(even) {
        @apply border-l border-light-gray pl-5 pr-10;
      }
    }
  }
</style>
