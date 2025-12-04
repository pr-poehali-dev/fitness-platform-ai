import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import Icon from '@/components/ui/icon';

interface Workout {
  id: number;
  title: string;
  duration: number;
  exercises: number;
  difficulty: 'Легко' | 'Средне' | 'Сложно';
  category: string;
  description: string;
  calories: number;
  videoUrl?: string;
}

interface Exercise {
  id: number;
  name: string;
  sets: number;
  reps: string;
  restTime: number;
  description: string;
}

const workouts: Workout[] = [
  {
    id: 1,
    title: 'Утренняя зарядка',
    duration: 15,
    exercises: 8,
    difficulty: 'Легко',
    category: 'Кардио',
    description: 'Энергичная разминка для отличного старта дня',
    calories: 150,
  },
  {
    id: 2,
    title: 'Силовая тренировка',
    duration: 45,
    exercises: 12,
    difficulty: 'Средне',
    category: 'Сила',
    description: 'Комплексная проработка основных групп мышц',
    calories: 350,
  },
  {
    id: 3,
    title: 'HIIT интервалы',
    duration: 30,
    exercises: 10,
    difficulty: 'Сложно',
    category: 'Кардио',
    description: 'Высокоинтенсивная интервальная тренировка для жиросжигания',
    calories: 400,
  },
  {
    id: 4,
    title: 'Йога и растяжка',
    duration: 20,
    exercises: 15,
    difficulty: 'Легко',
    category: 'Гибкость',
    description: 'Спокойная практика для расслабления и гибкости',
    calories: 120,
  },
  {
    id: 5,
    title: 'Пресс и кор',
    duration: 25,
    exercises: 9,
    difficulty: 'Средне',
    category: 'Сила',
    description: 'Целевая тренировка мышц кора и пресса',
    calories: 200,
  },
  {
    id: 6,
    title: 'Бег на выносливость',
    duration: 60,
    exercises: 5,
    difficulty: 'Сложно',
    category: 'Кардио',
    description: 'Длительная кардио-сессия для развития выносливости',
    calories: 600,
  },
];

const sampleExercises: Exercise[] = [
  { id: 1, name: 'Приседания', sets: 3, reps: '15-20', restTime: 60, description: 'Классические приседания с собственным весом' },
  { id: 2, name: 'Отжимания', sets: 3, reps: '10-15', restTime: 60, description: 'Отжимания от пола с правильной техникой' },
  { id: 3, name: 'Планка', sets: 3, reps: '30-60 сек', restTime: 45, description: 'Статическое упражнение для кора' },
  { id: 4, name: 'Выпады', sets: 3, reps: '12 на ногу', restTime: 60, description: 'Выпады вперед для ног и ягодиц' },
];

const aiMessages = [
  { role: 'ai', text: 'Привет! Я твой персональный ИИ-тренер 💪 Готов помочь тебе достичь целей!' },
  { role: 'ai', text: 'Какая у тебя цель? Сбросить вес, набрать массу или улучшить выносливость?' },
];

export default function Index() {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedWorkout, setSelectedWorkout] = useState<Workout | null>(null);
  const [workoutStarted, setWorkoutStarted] = useState(false);
  const [currentExercise, setCurrentExercise] = useState(0);
  const [workoutProgress, setWorkoutProgress] = useState(0);
  const [chatMessages, setChatMessages] = useState(aiMessages);
  const [userInput, setUserInput] = useState('');
  const [totalWorkouts, setTotalWorkouts] = useState(12);
  const [weeklyGoal] = useState(5);

  const difficultyColors = {
    'Легко': 'bg-green-500',
    'Средне': 'bg-yellow-500',
    'Сложно': 'bg-red-500',
  };

  const handleStartWorkout = (workout: Workout) => {
    setSelectedWorkout(workout);
    setWorkoutStarted(true);
    setCurrentExercise(0);
    setWorkoutProgress(0);
  };

  const handleNextExercise = () => {
    if (currentExercise < sampleExercises.length - 1) {
      setCurrentExercise(currentExercise + 1);
      setWorkoutProgress(((currentExercise + 1) / sampleExercises.length) * 100);
    } else {
      setWorkoutProgress(100);
      setTotalWorkouts(totalWorkouts + 1);
      setTimeout(() => {
        setWorkoutStarted(false);
        setSelectedWorkout(null);
      }, 2000);
    }
  };

  const handleSendMessage = () => {
    if (userInput.trim()) {
      setChatMessages([...chatMessages, { role: 'user', text: userInput }]);
      setUserInput('');
      
      setTimeout(() => {
        const responses = [
          'Отличный выбор! Давай составим программу специально для тебя 🎯',
          'Рекомендую начать с 3 тренировок в неделю по 30 минут. Постепенно увеличивай нагрузку!',
          'Помни про восстановление - сон и питание важны не меньше тренировок 😊',
          'Отлично! Следи за техникой выполнения - качество важнее количества 💯',
        ];
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        setChatMessages(prev => [...prev, { role: 'ai', text: randomResponse }]);
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border sticky top-0 bg-background/95 backdrop-blur-sm z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl md:text-3xl font-heading font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              FitPro
            </h1>
            <nav className="hidden md:flex gap-6">
              <Button variant={activeTab === 'home' ? 'default' : 'ghost'} onClick={() => setActiveTab('home')}>
                Главная
              </Button>
              <Button variant={activeTab === 'progress' ? 'default' : 'ghost'} onClick={() => setActiveTab('progress')}>
                Прогресс
              </Button>
              <Button variant={activeTab === 'trainer' ? 'default' : 'ghost'} onClick={() => setActiveTab('trainer')}>
                ИИ Тренер
              </Button>
            </nav>
            <Button size="icon" variant="outline">
              <Icon name="User" size={20} />
            </Button>
          </div>
          
          <div className="md:hidden flex gap-2 mt-4">
            <Button size="sm" variant={activeTab === 'home' ? 'default' : 'ghost'} onClick={() => setActiveTab('home')} className="flex-1">
              <Icon name="Home" size={16} className="mr-1" /> Главная
            </Button>
            <Button size="sm" variant={activeTab === 'progress' ? 'default' : 'ghost'} onClick={() => setActiveTab('progress')} className="flex-1">
              <Icon name="TrendingUp" size={16} className="mr-1" /> Прогресс
            </Button>
            <Button size="sm" variant={activeTab === 'trainer' ? 'default' : 'ghost'} onClick={() => setActiveTab('trainer')} className="flex-1">
              <Icon name="MessageCircle" size={16} className="mr-1" /> Тренер
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {activeTab === 'home' && (
          <div className="space-y-8 animate-fade-in">
            <div className="text-center space-y-4">
              <h2 className="text-4xl md:text-6xl font-heading font-bold">
                Твой путь к идеальной форме
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Персонализированные программы тренировок с ИИ-тренером
              </p>
            </div>

            <Card className="bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 border-none">
              <CardHeader>
                <CardTitle className="text-2xl font-heading">Быстрый старт</CardTitle>
                <CardDescription>Выбери длительность тренировки</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[15, 30, 45, 60].map((duration) => (
                    <Button
                      key={duration}
                      variant="outline"
                      className="h-24 flex flex-col items-center justify-center gap-2 hover:bg-primary/20 hover:border-primary transition-all"
                    >
                      <Icon name="Clock" size={24} />
                      <span className="text-lg font-semibold">{duration} мин</span>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div>
              <h3 className="text-2xl font-heading font-semibold mb-6">Программы тренировок</h3>
              <Tabs defaultValue="all" className="w-full">
                <TabsList className="grid w-full grid-cols-4 mb-6">
                  <TabsTrigger value="all">Все</TabsTrigger>
                  <TabsTrigger value="cardio">Кардио</TabsTrigger>
                  <TabsTrigger value="strength">Сила</TabsTrigger>
                  <TabsTrigger value="flexibility">Гибкость</TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="space-y-4">
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {workouts.map((workout) => (
                      <Card key={workout.id} className="overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
                        <div className="h-40 bg-gradient-to-br from-primary/30 via-secondary/30 to-accent/30 relative flex items-center justify-center">
                          <Icon name="Dumbbell" size={48} className="text-foreground/70 group-hover:scale-110 transition-transform" />
                          <Badge className={`absolute top-4 right-4 ${difficultyColors[workout.difficulty]}`}>
                            {workout.difficulty}
                          </Badge>
                        </div>
                        <CardHeader>
                          <CardTitle className="font-heading">{workout.title}</CardTitle>
                          <CardDescription>{workout.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="flex items-center justify-between text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Icon name="Clock" size={16} />
                              <span>{workout.duration} мин</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Icon name="Activity" size={16} />
                              <span>{workout.exercises} упр.</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Icon name="Flame" size={16} />
                              <span>{workout.calories} ккал</span>
                            </div>
                          </div>
                          <Button 
                            className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90" 
                            onClick={() => handleStartWorkout(workout)}
                          >
                            <Icon name="Play" size={16} className="mr-2" />
                            Начать тренировку
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="cardio">
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {workouts.filter(w => w.category === 'Кардио').map((workout) => (
                      <Card key={workout.id} className="overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
                        <div className="h-40 bg-gradient-to-br from-primary/30 via-secondary/30 to-accent/30 relative flex items-center justify-center">
                          <Icon name="Heart" size={48} className="text-foreground/70 group-hover:scale-110 transition-transform" />
                          <Badge className={`absolute top-4 right-4 ${difficultyColors[workout.difficulty]}`}>
                            {workout.difficulty}
                          </Badge>
                        </div>
                        <CardHeader>
                          <CardTitle className="font-heading">{workout.title}</CardTitle>
                          <CardDescription>{workout.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="flex items-center justify-between text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Icon name="Clock" size={16} />
                              <span>{workout.duration} мин</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Icon name="Activity" size={16} />
                              <span>{workout.exercises} упр.</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Icon name="Flame" size={16} />
                              <span>{workout.calories} ккал</span>
                            </div>
                          </div>
                          <Button 
                            className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90" 
                            onClick={() => handleStartWorkout(workout)}
                          >
                            <Icon name="Play" size={16} className="mr-2" />
                            Начать тренировку
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="strength">
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {workouts.filter(w => w.category === 'Сила').map((workout) => (
                      <Card key={workout.id} className="overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
                        <div className="h-40 bg-gradient-to-br from-primary/30 via-secondary/30 to-accent/30 relative flex items-center justify-center">
                          <Icon name="Dumbbell" size={48} className="text-foreground/70 group-hover:scale-110 transition-transform" />
                          <Badge className={`absolute top-4 right-4 ${difficultyColors[workout.difficulty]}`}>
                            {workout.difficulty}
                          </Badge>
                        </div>
                        <CardHeader>
                          <CardTitle className="font-heading">{workout.title}</CardTitle>
                          <CardDescription>{workout.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="flex items-center justify-between text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Icon name="Clock" size={16} />
                              <span>{workout.duration} мин</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Icon name="Activity" size={16} />
                              <span>{workout.exercises} упр.</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Icon name="Flame" size={16} />
                              <span>{workout.calories} ккал</span>
                            </div>
                          </div>
                          <Button 
                            className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90" 
                            onClick={() => handleStartWorkout(workout)}
                          >
                            <Icon name="Play" size={16} className="mr-2" />
                            Начать тренировку
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="flexibility">
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {workouts.filter(w => w.category === 'Гибкость').map((workout) => (
                      <Card key={workout.id} className="overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
                        <div className="h-40 bg-gradient-to-br from-primary/30 via-secondary/30 to-accent/30 relative flex items-center justify-center">
                          <Icon name="Wind" size={48} className="text-foreground/70 group-hover:scale-110 transition-transform" />
                          <Badge className={`absolute top-4 right-4 ${difficultyColors[workout.difficulty]}`}>
                            {workout.difficulty}
                          </Badge>
                        </div>
                        <CardHeader>
                          <CardTitle className="font-heading">{workout.title}</CardTitle>
                          <CardDescription>{workout.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="flex items-center justify-between text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Icon name="Clock" size={16} />
                              <span>{workout.duration} мин</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Icon name="Activity" size={16} />
                              <span>{workout.exercises} упр.</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Icon name="Flame" size={16} />
                              <span>{workout.calories} ккал</span>
                            </div>
                          </div>
                          <Button 
                            className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90" 
                            onClick={() => handleStartWorkout(workout)}
                          >
                            <Icon name="Play" size={16} className="mr-2" />
                            Начать тренировку
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        )}

        {activeTab === 'progress' && (
          <div className="space-y-8 animate-fade-in max-w-4xl mx-auto">
            <h2 className="text-4xl font-heading font-bold text-center">Твой прогресс</h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="bg-gradient-to-br from-primary/20 to-primary/5">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm text-muted-foreground">Завершено тренировок</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <p className="text-4xl font-heading font-bold">{totalWorkouts}</p>
                    <Icon name="CheckCircle" size={32} className="text-primary" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-secondary/20 to-secondary/5">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm text-muted-foreground">Недельная цель</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <p className="text-4xl font-heading font-bold">{weeklyGoal}/5</p>
                    <Icon name="Target" size={32} className="text-secondary" />
                  </div>
                  <Progress value={(weeklyGoal / 5) * 100} className="mt-4" />
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-accent/20 to-accent/5">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm text-muted-foreground">Сожжено калорий</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <p className="text-4xl font-heading font-bold">3240</p>
                    <Icon name="Flame" size={32} className="text-accent" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="font-heading">Статистика за неделю</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span>Понедельник</span>
                    <span className="text-muted-foreground">30 мин • 250 ккал</span>
                  </div>
                  <Progress value={100} className="h-2" />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span>Вторник</span>
                    <span className="text-muted-foreground">Отдых</span>
                  </div>
                  <Progress value={0} className="h-2" />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span>Среда</span>
                    <span className="text-muted-foreground">45 мин • 350 ккал</span>
                  </div>
                  <Progress value={100} className="h-2" />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span>Четверг</span>
                    <span className="text-muted-foreground">30 мин • 280 ккал</span>
                  </div>
                  <Progress value={100} className="h-2" />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span>Пятница</span>
                    <span className="text-muted-foreground">20 мин • 180 ккал</span>
                  </div>
                  <Progress value={100} className="h-2" />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span>Суббота</span>
                    <span className="text-muted-foreground">60 мин • 500 ккал</span>
                  </div>
                  <Progress value={100} className="h-2" />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span>Воскресенье</span>
                    <span className="text-muted-foreground">Запланировано</span>
                  </div>
                  <Progress value={30} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="font-heading flex items-center gap-2">
                  <Icon name="Trophy" size={24} className="text-primary" />
                  Достижения
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center space-y-2 p-4 rounded-lg bg-muted/50">
                    <div className="text-4xl">🔥</div>
                    <p className="text-sm font-medium">5 дней подряд</p>
                  </div>
                  <div className="text-center space-y-2 p-4 rounded-lg bg-muted/50">
                    <div className="text-4xl">💪</div>
                    <p className="text-sm font-medium">10 тренировок</p>
                  </div>
                  <div className="text-center space-y-2 p-4 rounded-lg bg-muted/50 opacity-50">
                    <div className="text-4xl">⚡</div>
                    <p className="text-sm font-medium">30 дней</p>
                  </div>
                  <div className="text-center space-y-2 p-4 rounded-lg bg-muted/50 opacity-50">
                    <div className="text-4xl">🏆</div>
                    <p className="text-sm font-medium">50 тренировок</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'trainer' && (
          <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-primary to-secondary">
                <Icon name="Bot" size={40} className="text-white" />
              </div>
              <h2 className="text-4xl font-heading font-bold">Твой ИИ-тренер</h2>
              <p className="text-muted-foreground">Задай любой вопрос о тренировках, питании или восстановлении</p>
            </div>

            <Card className="h-[500px] flex flex-col">
              <CardHeader className="pb-4">
                <CardTitle className="font-heading flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse-glow"></div>
                  Онлайн
                </CardTitle>
              </CardHeader>
              <Separator />
              <ScrollArea className="flex-1 p-6">
                <div className="space-y-4">
                  {chatMessages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'} animate-slide-up`}
                    >
                      {message.role === 'ai' && (
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0">
                          <Icon name="Bot" size={16} className="text-white" />
                        </div>
                      )}
                      <div
                        className={`px-4 py-3 rounded-2xl max-w-[80%] ${
                          message.role === 'user'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted'
                        }`}
                      >
                        <p className="text-sm">{message.text}</p>
                      </div>
                      {message.role === 'user' && (
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent to-secondary flex items-center justify-center flex-shrink-0">
                          <Icon name="User" size={16} className="text-white" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </ScrollArea>
              <Separator />
              <CardContent className="pt-4 pb-4">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Напиши сообщение..."
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="flex-1 px-4 py-2 bg-muted rounded-lg outline-none focus:ring-2 focus:ring-primary"
                  />
                  <Button onClick={handleSendMessage} size="icon" className="bg-gradient-to-r from-primary to-secondary">
                    <Icon name="Send" size={18} />
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-3 gap-4">
              <Button
                variant="outline"
                className="h-auto py-4 px-4 flex flex-col items-start gap-2 hover:bg-primary/10"
                onClick={() => setUserInput('Как правильно делать приседания?')}
              >
                <Icon name="HelpCircle" size={20} />
                <span className="text-sm text-left">Как правильно делать приседания?</span>
              </Button>
              <Button
                variant="outline"
                className="h-auto py-4 px-4 flex flex-col items-start gap-2 hover:bg-primary/10"
                onClick={() => setUserInput('Составь план питания')}
              >
                <Icon name="Apple" size={20} />
                <span className="text-sm text-left">Составь план питания</span>
              </Button>
              <Button
                variant="outline"
                className="h-auto py-4 px-4 flex flex-col items-start gap-2 hover:bg-primary/10"
                onClick={() => setUserInput('Как избежать травм?')}
              >
                <Icon name="Shield" size={20} />
                <span className="text-sm text-left">Как избежать травм?</span>
              </Button>
            </div>
          </div>
        )}
      </main>

      <Dialog open={workoutStarted} onOpenChange={setWorkoutStarted}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-heading">{selectedWorkout?.title}</DialogTitle>
            <DialogDescription>
              {workoutProgress === 100 ? 'Тренировка завершена! 🎉' : `Упражнение ${currentExercise + 1} из ${sampleExercises.length}`}
            </DialogDescription>
          </DialogHeader>
          
          {workoutProgress < 100 ? (
            <div className="space-y-6">
              <Progress value={workoutProgress} className="h-3" />
              
              <div className="bg-muted/50 rounded-lg p-6 space-y-4">
                <h3 className="text-xl font-heading font-semibold">{sampleExercises[currentExercise].name}</h3>
                <p className="text-muted-foreground">{sampleExercises[currentExercise].description}</p>
                
                <div className="grid grid-cols-3 gap-4 pt-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary">{sampleExercises[currentExercise].sets}</p>
                    <p className="text-sm text-muted-foreground">Подхода</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-secondary">{sampleExercises[currentExercise].reps}</p>
                    <p className="text-sm text-muted-foreground">Повторений</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-accent">{sampleExercises[currentExercise].restTime}с</p>
                    <p className="text-sm text-muted-foreground">Отдых</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 rounded-lg p-6 flex items-center justify-center min-h-[200px]">
                <div className="text-center space-y-2">
                  <Icon name="Play" size={48} className="mx-auto text-primary" />
                  <p className="text-sm text-muted-foreground">Видео с техникой выполнения</p>
                </div>
              </div>

              <Button 
                onClick={handleNextExercise} 
                className="w-full h-12 text-lg bg-gradient-to-r from-primary to-secondary hover:opacity-90"
              >
                {currentExercise < sampleExercises.length - 1 ? 'Следующее упражнение' : 'Завершить тренировку'}
                <Icon name="ArrowRight" size={20} className="ml-2" />
              </Button>
            </div>
          ) : (
            <div className="text-center space-y-6 py-8">
              <div className="text-6xl">🎉</div>
              <h3 className="text-2xl font-heading font-bold">Отличная работа!</h3>
              <p className="text-muted-foreground">
                Ты завершил тренировку "{selectedWorkout?.title}"
              </p>
              <div className="flex items-center justify-center gap-8 pt-4">
                <div className="text-center">
                  <p className="text-3xl font-bold text-primary">{selectedWorkout?.duration}</p>
                  <p className="text-sm text-muted-foreground">минут</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-secondary">{selectedWorkout?.exercises}</p>
                  <p className="text-sm text-muted-foreground">упражнений</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-accent">{selectedWorkout?.calories}</p>
                  <p className="text-sm text-muted-foreground">ккал</p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}