using Strongg.Domain.Workouts;

namespace Strongg.Infrastructure.Persistence;

public class InMemoryWorkoutRepository : IWorkoutRepository
{
    private readonly List<Workout> _workouts = new();

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
