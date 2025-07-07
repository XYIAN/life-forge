'use client';

import { useState, useEffect, useRef } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { ProgressBar } from 'primereact/progressbar';
import { Chart } from 'primereact/chart';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Tag } from 'primereact/tag';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Dropdown } from 'primereact/dropdown';

import { MultiSelect } from 'primereact/multiselect';
import { ShineBorder } from '@/components/magicui';
import { useAnime, animePresets, createStaggerAnimation } from '@/hooks/use-anime';

interface NutritionEntry {
  id: string;
  name: string;
  type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  date: Date;
  ingredients: string[];
  notes?: string;
}

const mealTypes = [
  { label: 'Breakfast', value: 'breakfast' },
  { label: 'Lunch', value: 'lunch' },
  { label: 'Dinner', value: 'dinner' },
  { label: 'Snack', value: 'snack' },
];

const commonIngredients = [
  'Chicken Breast',
  'Salmon',
  'Eggs',
  'Greek Yogurt',
  'Quinoa',
  'Brown Rice',
  'Sweet Potato',
  'Broccoli',
  'Spinach',
  'Avocado',
  'Almonds',
  'Banana',
  'Blueberries',
  'Oatmeal',
  'Whole Grain Bread',
  'Turkey',
  'Tuna',
  'Cottage Cheese',
  'Lentils',
  'Chickpeas',
  'Kale',
  'Carrots',
  'Tomatoes',
  'Cucumber',
  'Bell Peppers',
];

export default function NutritionPage() {
  const [nutritionEntries, setNutritionEntries] = useState<NutritionEntry[]>([]);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [currentEntry, setCurrentEntry] = useState<Partial<NutritionEntry>>({});
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [selectedEntry, setSelectedEntry] = useState<NutritionEntry | null>(null);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [dailyGoals] = useState({
    calories: 2000,
    protein: 150,
    carbs: 250,
    fat: 65,
    fiber: 25,
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  // Animation hooks
  const { add } = useAnime({ targets: '', autoplay: false });

  useEffect(() => {
    // Load nutrition entries from localStorage
    const savedEntries = localStorage.getItem('nutritionEntries');
    if (savedEntries) {
      setNutritionEntries(
        JSON.parse(savedEntries).map((e: Record<string, unknown>) => ({
          ...e,
          date: new Date(e.date as string),
        }))
      );
    }

    // Animate page entrance
    if (containerRef.current) {
      add({
        targets: containerRef.current,
        ...animePresets.fadeInUp,
        duration: 1000,
      });
    }
  }, []);

  useEffect(() => {
    // Animate cards with stagger
    if (cardsRef.current) {
      const cards = Array.from(
        cardsRef.current.querySelectorAll('.nutrition-card')
      ) as HTMLElement[];
      const staggerOptions = createStaggerAnimation(cards, animePresets.fadeInUp, 150);
      add(staggerOptions);
    }
  }, [nutritionEntries, add]);

  const saveNutritionEntries = (updatedEntries: NutritionEntry[]) => {
    setNutritionEntries(updatedEntries);
    localStorage.setItem('nutritionEntries', JSON.stringify(updatedEntries));
  };

  const addNutritionEntry = () => {
    if (!currentEntry.name || !currentEntry.type || !currentEntry.calories) return;

    const newEntry: NutritionEntry = {
      id: Date.now().toString(),
      name: currentEntry.name!,
      type: currentEntry.type!,
      calories: currentEntry.calories!,
      protein: currentEntry.protein || 0,
      carbs: currentEntry.carbs || 0,
      fat: currentEntry.fat || 0,
      fiber: currentEntry.fiber || 0,
      date: new Date(),
      ingredients: selectedIngredients,
      notes: currentEntry.notes,
    };

    const updatedEntries = [newEntry, ...nutritionEntries];
    saveNutritionEntries(updatedEntries);

    setShowAddDialog(false);
    setCurrentEntry({});
    setSelectedIngredients([]);
  };

  const getMealTypeColor = (type: string) => {
    switch (type) {
      case 'breakfast':
        return 'warning';
      case 'lunch':
        return 'success';
      case 'dinner':
        return 'danger';
      case 'snack':
        return 'info';
      default:
        return 'secondary';
    }
  };

  const getMealTypeIcon = (type: string) => {
    switch (type) {
      case 'breakfast':
        return 'pi pi-sun';
      case 'lunch':
        return 'pi pi-clock';
      case 'dinner':
        return 'pi pi-moon';
      case 'snack':
        return 'pi pi-star';
      default:
        return 'pi pi-apple';
    }
  };

  // Calculate today's totals
  const today = new Date().toISOString().split('T')[0];
  const todayEntries = nutritionEntries.filter(
    entry => entry.date.toISOString().split('T')[0] === today
  );

  const todayTotals = {
    calories: todayEntries.reduce((sum, entry) => sum + entry.calories, 0),
    protein: todayEntries.reduce((sum, entry) => sum + entry.protein, 0),
    carbs: todayEntries.reduce((sum, entry) => sum + entry.carbs, 0),
    fat: todayEntries.reduce((sum, entry) => sum + entry.fat, 0),
    fiber: todayEntries.reduce((sum, entry) => sum + entry.fiber, 0),
  };

  // Chart data
  const macroData = {
    labels: ['Protein', 'Carbs', 'Fat'],
    datasets: [
      {
        data: [todayTotals.protein, todayTotals.carbs, todayTotals.fat],
        backgroundColor: [
          'rgba(239, 68, 68, 0.8)',
          'rgba(34, 197, 94, 0.8)',
          'rgba(245, 158, 11, 0.8)',
        ],
        borderWidth: 2,
        borderColor: '#ffffff',
      },
    ],
  };

  const weeklyCaloriesData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Calories Consumed',
        data: [1850, 2100, 1950, 2200, 1800, 2300, 2000],
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        borderColor: 'rgb(59, 130, 246)',
        borderWidth: 2,
        fill: false,
      },
      {
        label: 'Calorie Goal',
        data: [2000, 2000, 2000, 2000, 2000, 2000, 2000],
        backgroundColor: 'rgba(239, 68, 68, 0.3)',
        borderColor: 'rgb(239, 68, 68)',
        borderWidth: 2,
        fill: false,
        borderDash: [5, 5],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: 'var(--foreground)',
        },
      },
    },
    scales: {
      y: {
        ticks: {
          color: 'var(--foreground)',
        },
        grid: {
          color: 'var(--glass-border)',
        },
      },
      x: {
        ticks: {
          color: 'var(--foreground)',
        },
        grid: {
          color: 'var(--glass-border)',
        },
      },
    },
  };

  return (
    <div ref={containerRef} className="nutrition-page">
      <div className="grid">
        {/* Header */}
        <div className="col-12 mb-4">
          <ShineBorder
            className="rounded-lg p-4"
            shineColor={['#22c55e', '#f59e0b', '#ef4444']}
            duration={6}
            borderWidth={2}
          >
            <Card className="glass-card">
              <div className="flex flex-column md:flex-row justify-content-between align-items-center">
                <div>
                  <h1 className="text-3xl font-bold m-0" style={{ color: 'var(--foreground)' }}>
                    <i className="pi pi-apple mr-3" style={{ color: 'var(--warm-gold)' }}></i>
                    Nutrition
                  </h1>
                  <p
                    className="text-lg m-0 mt-2"
                    style={{ color: 'var(--foreground)', opacity: 0.7 }}
                  >
                    Track your daily nutrition and maintain a healthy diet
                  </p>
                </div>
                <Button
                  label="Add Meal"
                  icon="pi pi-plus"
                  className="p-button-success mt-3 md:mt-0"
                  onClick={() => setShowAddDialog(true)}
                />
              </div>
            </Card>
          </ShineBorder>
        </div>

        {/* Today's Progress */}
        <div className="col-12 mb-4">
          <Card className="glass-card nutrition-card">
            <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--foreground)' }}>
              Today&apos;s Nutrition Progress
            </h3>
            <div className="grid">
              <div className="col-12 lg:col-2 mb-3">
                <div className="text-center">
                  <h4 className="text-lg font-semibold m-0" style={{ color: 'var(--foreground)' }}>
                    {todayTotals.calories}
                  </h4>
                  <p className="text-sm m-0" style={{ color: 'var(--foreground)', opacity: 0.7 }}>
                    Calories
                  </p>
                  <ProgressBar
                    value={(todayTotals.calories / dailyGoals.calories) * 100}
                    className="mt-2"
                  />
                </div>
              </div>
              <div className="col-12 lg:col-2 mb-3">
                <div className="text-center">
                  <h4 className="text-lg font-semibold m-0" style={{ color: 'var(--foreground)' }}>
                    {todayTotals.protein}g
                  </h4>
                  <p className="text-sm m-0" style={{ color: 'var(--foreground)', opacity: 0.7 }}>
                    Protein
                  </p>
                  <ProgressBar
                    value={(todayTotals.protein / dailyGoals.protein) * 100}
                    className="mt-2"
                  />
                </div>
              </div>
              <div className="col-12 lg:col-2 mb-3">
                <div className="text-center">
                  <h4 className="text-lg font-semibold m-0" style={{ color: 'var(--foreground)' }}>
                    {todayTotals.carbs}g
                  </h4>
                  <p className="text-sm m-0" style={{ color: 'var(--foreground)', opacity: 0.7 }}>
                    Carbs
                  </p>
                  <ProgressBar
                    value={(todayTotals.carbs / dailyGoals.carbs) * 100}
                    className="mt-2"
                  />
                </div>
              </div>
              <div className="col-12 lg:col-2 mb-3">
                <div className="text-center">
                  <h4 className="text-lg font-semibold m-0" style={{ color: 'var(--foreground)' }}>
                    {todayTotals.fat}g
                  </h4>
                  <p className="text-sm m-0" style={{ color: 'var(--foreground)', opacity: 0.7 }}>
                    Fat
                  </p>
                  <ProgressBar value={(todayTotals.fat / dailyGoals.fat) * 100} className="mt-2" />
                </div>
              </div>
              <div className="col-12 lg:col-2 mb-3">
                <div className="text-center">
                  <h4 className="text-lg font-semibold m-0" style={{ color: 'var(--foreground)' }}>
                    {todayTotals.fiber}g
                  </h4>
                  <p className="text-sm m-0" style={{ color: 'var(--foreground)', opacity: 0.7 }}>
                    Fiber
                  </p>
                  <ProgressBar
                    value={(todayTotals.fiber / dailyGoals.fiber) * 100}
                    className="mt-2"
                  />
                </div>
              </div>
              <div className="col-12 lg:col-2 mb-3">
                <div className="text-center">
                  <h4 className="text-lg font-semibold m-0" style={{ color: 'var(--foreground)' }}>
                    {todayEntries.length}
                  </h4>
                  <p className="text-sm m-0" style={{ color: 'var(--foreground)', opacity: 0.7 }}>
                    Meals Today
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Charts */}
        <div className="col-12 lg:col-8 mb-4">
          <Card className="glass-card nutrition-card">
            <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--foreground)' }}>
              Weekly Calorie Intake
            </h3>
            <div style={{ height: '300px' }}>
              <Chart type="line" data={weeklyCaloriesData} options={chartOptions} />
            </div>
          </Card>
        </div>

        <div className="col-12 lg:col-4 mb-4">
          <Card className="glass-card nutrition-card">
            <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--foreground)' }}>
              Today&apos;s Macros
            </h3>
            <div style={{ height: '300px' }}>
              <Chart type="doughnut" data={macroData} options={chartOptions} />
            </div>
          </Card>
        </div>

        {/* Nutrition Entries List */}
        <div className="col-12">
          <Card className="glass-card nutrition-card">
            <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--foreground)' }}>
              Recent Meals
            </h3>
            <DataTable
              value={nutritionEntries}
              paginator
              rows={5}
              rowsPerPageOptions={[5, 10, 20]}
              className="glass-table"
              emptyMessage="No meals logged yet. Start tracking your nutrition!"
            >
              <Column
                field="name"
                header="Meal"
                body={(rowData: NutritionEntry) => (
                  <div className="flex align-items-center">
                    <i
                      className={`${getMealTypeIcon(rowData.type)} mr-2`}
                      style={{ color: 'var(--warm-gold)' }}
                    ></i>
                    <span style={{ color: 'var(--foreground)' }}>{rowData.name}</span>
                  </div>
                )}
              />
              <Column
                field="type"
                header="Type"
                body={(rowData: NutritionEntry) => (
                  <Tag
                    value={rowData.type.charAt(0).toUpperCase() + rowData.type.slice(1)}
                    severity={getMealTypeColor(rowData.type)}
                  />
                )}
              />
              <Column
                field="calories"
                header="Calories"
                body={(rowData: NutritionEntry) => (
                  <span style={{ color: 'var(--foreground)' }}>{rowData.calories}</span>
                )}
              />
              <Column
                field="protein"
                header="Protein"
                body={(rowData: NutritionEntry) => (
                  <span style={{ color: 'var(--foreground)' }}>{rowData.protein}g</span>
                )}
              />
              <Column
                field="carbs"
                header="Carbs"
                body={(rowData: NutritionEntry) => (
                  <span style={{ color: 'var(--foreground)' }}>{rowData.carbs}g</span>
                )}
              />
              <Column
                field="fat"
                header="Fat"
                body={(rowData: NutritionEntry) => (
                  <span style={{ color: 'var(--foreground)' }}>{rowData.fat}g</span>
                )}
              />
              <Column
                field="date"
                header="Date"
                body={(rowData: NutritionEntry) => (
                  <span style={{ color: 'var(--foreground)' }}>
                    {rowData.date.toLocaleDateString()}
                  </span>
                )}
              />
              <Column
                header="Actions"
                body={(rowData: NutritionEntry) => (
                  <Button
                    icon="pi pi-eye"
                    className="p-button-text p-button-sm"
                    onClick={() => {
                      setSelectedEntry(rowData);
                      setShowDetailsDialog(true);
                    }}
                  />
                )}
              />
            </DataTable>
          </Card>
        </div>
      </div>

      {/* Add Meal Dialog */}
      <Dialog
        header="Add New Meal"
        visible={showAddDialog}
        onHide={() => setShowAddDialog(false)}
        style={{ width: '90vw', maxWidth: '600px' }}
        className="glass-dialog"
      >
        <div className="grid">
          <div className="col-12 mb-3">
            <label
              className="block text-sm font-medium mb-2"
              style={{ color: 'var(--foreground)' }}
            >
              Meal Name
            </label>
            <InputText
              value={currentEntry.name || ''}
              onChange={e => setCurrentEntry({ ...currentEntry, name: e.target.value })}
              className="w-full"
              placeholder="Enter meal name"
            />
          </div>

          <div className="col-12 mb-3">
            <label
              className="block text-sm font-medium mb-2"
              style={{ color: 'var(--foreground)' }}
            >
              Meal Type
            </label>
            <Dropdown
              value={currentEntry.type}
              options={mealTypes}
              onChange={e => setCurrentEntry({ ...currentEntry, type: e.value })}
              className="w-full"
              placeholder="Select meal type"
            />
          </div>

          <div className="col-6 mb-3">
            <label
              className="block text-sm font-medium mb-2"
              style={{ color: 'var(--foreground)' }}
            >
              Calories
            </label>
            <InputNumber
              value={currentEntry.calories ?? undefined}
              onValueChange={e =>
                setCurrentEntry({ ...currentEntry, calories: e.value ?? undefined })
              }
              min={0}
              className="w-full"
              placeholder="Calories"
            />
          </div>

          <div className="col-6 mb-3">
            <label
              className="block text-sm font-medium mb-2"
              style={{ color: 'var(--foreground)' }}
            >
              Protein (g)
            </label>
            <InputNumber
              value={currentEntry.protein ?? undefined}
              onValueChange={e =>
                setCurrentEntry({ ...currentEntry, protein: e.value ?? undefined })
              }
              min={0}
              className="w-full"
              placeholder="Protein"
            />
          </div>

          <div className="col-6 mb-3">
            <label
              className="block text-sm font-medium mb-2"
              style={{ color: 'var(--foreground)' }}
            >
              Carbs (g)
            </label>
            <InputNumber
              value={currentEntry.carbs ?? undefined}
              onValueChange={e => setCurrentEntry({ ...currentEntry, carbs: e.value ?? undefined })}
              min={0}
              className="w-full"
              placeholder="Carbs"
            />
          </div>

          <div className="col-6 mb-3">
            <label
              className="block text-sm font-medium mb-2"
              style={{ color: 'var(--foreground)' }}
            >
              Fat (g)
            </label>
            <InputNumber
              value={currentEntry.fat ?? undefined}
              onValueChange={e => setCurrentEntry({ ...currentEntry, fat: e.value ?? undefined })}
              min={0}
              className="w-full"
              placeholder="Fat"
            />
          </div>

          <div className="col-12 mb-3">
            <label
              className="block text-sm font-medium mb-2"
              style={{ color: 'var(--foreground)' }}
            >
              Fiber (g)
            </label>
            <InputNumber
              value={currentEntry.fiber ?? undefined}
              onValueChange={e => setCurrentEntry({ ...currentEntry, fiber: e.value ?? undefined })}
              min={0}
              className="w-full"
              placeholder="Fiber"
            />
          </div>

          <div className="col-12 mb-3">
            <label
              className="block text-sm font-medium mb-2"
              style={{ color: 'var(--foreground)' }}
            >
              Ingredients
            </label>
            <MultiSelect
              value={selectedIngredients}
              options={commonIngredients.map(ing => ({ label: ing, value: ing }))}
              onChange={e => setSelectedIngredients(e.value)}
              className="w-full"
              placeholder="Select ingredients"
              filter
            />
          </div>

          <div className="col-12 mb-3">
            <label
              className="block text-sm font-medium mb-2"
              style={{ color: 'var(--foreground)' }}
            >
              Notes
            </label>
            <InputText
              value={currentEntry.notes || ''}
              onChange={e => setCurrentEntry({ ...currentEntry, notes: e.target.value })}
              className="w-full"
              placeholder="Optional notes"
            />
          </div>

          <div className="col-12 flex justify-content-end">
            <Button
              label="Cancel"
              className="p-button-text mr-2"
              onClick={() => setShowAddDialog(false)}
            />
            <Button
              label="Save Meal"
              onClick={addNutritionEntry}
              disabled={!currentEntry.name || !currentEntry.type || !currentEntry.calories}
            />
          </div>
        </div>
      </Dialog>

      {/* Meal Details Dialog */}
      <Dialog
        header="Meal Details"
        visible={showDetailsDialog}
        onHide={() => setShowDetailsDialog(false)}
        style={{ width: '90vw', maxWidth: '600px' }}
        className="glass-dialog"
      >
        {selectedEntry && (
          <div className="grid">
            <div className="col-12 mb-4">
              <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--foreground)' }}>
                {selectedEntry.name}
              </h3>
              <div className="flex gap-3 mb-3">
                <Tag
                  value={selectedEntry.type.charAt(0).toUpperCase() + selectedEntry.type.slice(1)}
                  severity={getMealTypeColor(selectedEntry.type)}
                />
                <span style={{ color: 'var(--foreground)' }}>
                  {selectedEntry.calories} calories
                </span>
              </div>
              {selectedEntry.notes && (
                <p style={{ color: 'var(--foreground)', opacity: 0.8 }}>{selectedEntry.notes}</p>
              )}
            </div>

            <div className="col-12 mb-4">
              <h4 className="text-lg font-semibold mb-3" style={{ color: 'var(--foreground)' }}>
                Nutritional Information
              </h4>
              <div className="grid">
                <div className="col-6">
                  <p style={{ color: 'var(--foreground)' }}>
                    <strong>Protein:</strong> {selectedEntry.protein}g
                  </p>
                </div>
                <div className="col-6">
                  <p style={{ color: 'var(--foreground)' }}>
                    <strong>Carbs:</strong> {selectedEntry.carbs}g
                  </p>
                </div>
                <div className="col-6">
                  <p style={{ color: 'var(--foreground)' }}>
                    <strong>Fat:</strong> {selectedEntry.fat}g
                  </p>
                </div>
                <div className="col-6">
                  <p style={{ color: 'var(--foreground)' }}>
                    <strong>Fiber:</strong> {selectedEntry.fiber}g
                  </p>
                </div>
              </div>
            </div>

            {selectedEntry.ingredients.length > 0 && (
              <div className="col-12">
                <h4 className="text-lg font-semibold mb-3" style={{ color: 'var(--foreground)' }}>
                  Ingredients
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedEntry.ingredients.map((ingredient, index) => (
                    <Tag key={index} value={ingredient} severity="info" />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </Dialog>
    </div>
  );
}
