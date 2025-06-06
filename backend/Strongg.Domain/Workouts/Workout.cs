using System;
using System.Collections.Generic;

namespace Strongg.Domain.Workouts;

public class Workout
{
    public Guid Id { get; init; }
    public DateOnly Date { get; init; }
    public List<Exercise> Exercises { get; } = new();

    public Workout(Guid id, DateOnly date)
    {
        Id = id;
        Date = date;
    }

    public void AddExercise(Exercise exercise)
    {
        Exercises.Add(exercise);
    }
}

public record Exercise(string Name, int Sets, int Reps);
