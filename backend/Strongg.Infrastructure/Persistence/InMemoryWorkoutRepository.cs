using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Strongg.Domain.Workouts;

namespace Strongg.Infrastructure.Persistence;

public class InMemoryWorkoutRepository : IWorkoutRepository
{
    private readonly List<Workout> _workouts = new();

    public InMemoryWorkoutRepository()
    {
        // Seed with some example workouts
        var yesterday = DateOnly.FromDateTime(DateTime.UtcNow.AddDays(-1));
        var w1 = new Workout(Guid.NewGuid(), yesterday);
        w1.AddExercise(new Exercise("Push-ups", 3, 12));
        w1.AddExercise(new Exercise("Pull-ups", 3, 10));
        _workouts.Add(w1);

        var today = DateOnly.FromDateTime(DateTime.UtcNow);
        var w2 = new Workout(Guid.NewGuid(), today);
        w2.AddExercise(new Exercise("Squats", 4, 8));
        _workouts.Add(w2);
    }

    public Task AddAsync(Workout workout)
    {
        _workouts.Add(workout);
        return Task.CompletedTask;
    }

    public Task<IReadOnlyList<Workout>> GetAllAsync()
    {
        return Task.FromResult((IReadOnlyList<Workout>)_workouts.ToList());
    }
}
